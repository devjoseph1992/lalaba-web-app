// src/components/Forms.tsx
'use client';

import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  UserCredential,
} from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { auth, db, storage } from '@/config/firebaseConfig';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';

import LeftSidePanel from './forms/LeftSidePanel';
import TabButtons from './forms/TabButtons';
import FormInput from './forms/FormInput';
import FormSelect from './forms/FormSelect';
import SubmitButton from './forms/SubmitButton';

type UserType = 'rider' | 'merchant' | 'washer';

interface Address {
  text: string;
  lat: number;
  lng: number;
}

interface UserData {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: UserType;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  status: 'pending';
  emailVerified: boolean;
  address: Address;
  businessName?: string;
  businessPermit?: string;
  logoURL?: string;
  vehicleUnit?: string;
  driverLicenseNumber?: string;
  plateNumber?: string;
  profilePhotoURL?: string;
  experience?: string;
}

const Registration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<UserType>('rider');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    userType: 'rider' as UserType,
    /* Rider-specific */
    vehicleUnit: '',
    driverLicenseNumber: '',
    plateNumber: '',
    /* Merchant-specific */
    businessName: '',
    businessPermit: '',
    businessAddress: '',
    /* Washer-specific */
    experience: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  // Ref for Google Places autocomplete (all roles use the same "businessAddress")
  const addressRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Handle any input or select change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle file input (profile photo or business logo)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleTabChange = (tab: UserType) => {
    setActiveTab(tab);
    setFormData(prev => ({
      ...prev,
      userType: tab,
      // Reset fields specific to each role, but keep phoneNumber intact
      vehicleUnit: '',
      driverLicenseNumber: '',
      plateNumber: '',
      businessName: '',
      businessPermit: '',
      businessAddress: '',
      experience: '',
      // (we do NOT reset phoneNumber here, so it persists)
    }));
    setFile(null);
  };

  // Geocode using Google Maps API (if needed)
  const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number }> => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) throw new Error('Missing GOOGLE_MAPS_API_KEY');
    const encoded = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${apiKey}`;
    const res = await axios.get(url);
    if (res.data.results?.length > 0) {
      return res.data.results[0].geometry.location;
    }
    throw new Error('Address not found');
  };

  // Initialize Google Places Autocomplete for the single address field
  useEffect(() => {
    if (
        addressRef.current &&
        typeof window !== 'undefined' &&
        window.google?.maps?.places
    ) {
      if (!autocompleteRef.current) {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(
            addressRef.current,
            {
              types: ['address'],
              fields: ['formatted_address'],
            }
        );
        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current!.getPlace();
          if (place.formatted_address) {
            setFormData(prev => ({
              ...prev,
              businessAddress: place.formatted_address!,
            }));
          }
        });
      }
    }
  }, [activeTab]);

  // Tailwind classes to force "black" text on inputs
  const baseInputClasses =
      'text-black bg-white placeholder-gray-400 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-black';

  // Render fields specific to Rider / Merchant / Washer (excluding the shared address field)
  const renderRoleSpecificFields = () => {
    switch (activeTab) {
      case 'rider':
        return (
            <>
              <FormSelect
                  id="vehicleUnit"
                  name="vehicleUnit"
                  label="Vehicle Unit *"
                  value={formData.vehicleUnit}
                  onChange={handleChange}
                  options={[
                    { value: 'motor', label: 'Motorcycle' },
                    { value: 'bicycle', label: 'Bicycle' },
                    { value: 'car', label: 'Car' },
                    { value: 'other', label: 'Other' },
                  ]}
                  required
                  className={baseInputClasses}
              />
              <FormInput
                  id="driverLicenseNumber"
                  name="driverLicenseNumber"
                  label="Driver License Number *"
                  value={formData.driverLicenseNumber}
                  onChange={handleChange}
                  placeholder="Enter license number"
                  required
                  className={baseInputClasses}
              />
              <FormInput
                  id="plateNumber"
                  name="plateNumber"
                  label="Plate Number *"
                  value={formData.plateNumber}
                  onChange={handleChange}
                  placeholder="Enter plate number"
                  required
                  className={baseInputClasses}
              />
              <div className="mb-4">
                <label htmlFor="file" className="block text-gray-700 mb-1">
                  Upload Profile Photo *
                </label>
                <label
                    htmlFor="file"
                    className="inline-flex items-center px-4 py-2 bg-sky-600 text-white rounded cursor-pointer hover:bg-sky-700"
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v-4a4 4 0 014-4h5V4h2v4h5a4 4 0 014 4v4M8 16h8m-4-4v8"
                    />
                  </svg>
                  Choose File
                  <input
                      id="file"
                      name="file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                      className="hidden"
                  />
                </label>
                {file && <p className="mt-2 text-sm text-gray-700">{file.name}</p>}
              </div>
            </>
        );

      case 'merchant':
        return (
            <>
              <FormInput
                  id="businessName"
                  name="businessName"
                  label="Business Name *"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Your business name"
                  required
                  className={baseInputClasses}
              />
              <FormInput
                  id="businessPermit"
                  name="businessPermit"
                  label="Business Permit Number *"
                  value={formData.businessPermit}
                  onChange={handleChange}
                  placeholder="Enter permit #"
                  required
                  className={baseInputClasses}
              />
              <div className="mb-4">
                <label htmlFor="file" className="block text-gray-700 mb-1">
                  Upload Business Logo *
                </label>
                <label
                    htmlFor="file"
                    className="inline-flex items-center px-4 py-2 bg-sky-600 text-white rounded cursor-pointer hover:bg-sky-700"
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v-4a4 4 0 014-4h5V4h2v4h5a4 4 0 014 4v4M8 16h8m-4-4v8"
                    />
                  </svg>
                  Choose File
                  <input
                      id="file"
                      name="file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                      className="hidden"
                  />
                </label>
                {file && <p className="mt-2 text-sm text-gray-700">{file.name}</p>}
              </div>
            </>
        );

      case 'washer':
        return (
            <>
              <FormSelect
                  id="experience"
                  name="experience"
                  label="Cleaning Experience *"
                  value={formData.experience}
                  onChange={handleChange}
                  options={[
                    { value: 'beginner', label: 'Beginner (0-1 years)' },
                    { value: 'intermediate', label: 'Intermediate (1-3 years)' },
                    { value: 'expert', label: 'Expert (3+ years)' },
                  ]}
                  required
                  className={baseInputClasses}
              />
              <div className="mb-4">
                <label htmlFor="file" className="block text-gray-700 mb-1">
                  Upload Photo *
                </label>
                <label
                    htmlFor="file"
                    className="inline-flex items-center px-4 py-2 bg-sky-600 text-white rounded cursor-pointer hover:bg-sky-700"
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v-4a4 4 0 014-4h5V4h2v4h5a4 4 0 014 4v4M8 16h8m-4-4v8"
                    />
                  </svg>
                  Choose File
                  <input
                      id="file"
                      name="file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                      className="hidden"
                  />
                </label>
                {file && <p className="mt-2 text-sm text-gray-700">{file.name}</p>}
              </div>
            </>
        );

      default:
        return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // 1) Validate common fields
      if (
          !formData.firstName ||
          !formData.lastName ||
          !formData.email ||
          !formData.password ||
          !formData.phoneNumber
      ) {
        throw new Error('Please fill in all required fields.');
      }

      // 2) Validate role-specific fields
      if (activeTab === 'rider') {
        if (
            !formData.vehicleUnit ||
            !formData.driverLicenseNumber ||
            !formData.plateNumber
        ) {
          throw new Error('Please fill all rider-specific fields.');
        }
        if (!file) {
          throw new Error('Please upload a profile photo.');
        }
      }

      if (activeTab === 'merchant') {
        if (
            !formData.businessName ||
            !formData.businessPermit ||
            !formData.businessAddress
        ) {
          throw new Error('Please fill all merchant-specific fields.');
        }
        if (!file) {
          throw new Error('Please upload a business logo.');
        }
      }

      if (activeTab === 'washer') {
        if (!formData.businessAddress || !formData.experience) {
          throw new Error('Please fill all washer-specific fields.');
        }
        if (!file) {
          throw new Error('Please upload a photo.');
        }
      }

      // 3) Geocode if needed
      let geocoded: { lat: number; lng: number } = { lat: 0, lng: 0 };
      const addressToGeocode = formData.businessAddress;
      if (
          (activeTab === 'merchant' ||
              activeTab === 'rider' ||
              activeTab === 'washer') &&
          addressToGeocode
      ) {
        geocoded = await geocodeAddress(addressToGeocode);
      }
      const { lat, lng } = geocoded;

      // 4) Create Firebase Auth user
      const fullName = `${formData.firstName} ${formData.lastName}`;
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
          auth!,
          formData.email,
          formData.password
      );

      // 4a) Immediately set displayName
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      // 4b) Send verification email
      await sendEmailVerification(userCredential.user);

      const user = userCredential.user;
      const now = new Date();

      // 5) Upload file to Storage (either "photo" or "logo")
      const folderName = activeTab === 'merchant' ? 'logo' : 'photo';
      const fileRef = storageRef(storage!, `users/${user.uid}/${folderName}`);
      await uploadBytes(fileRef, file!);
      const fileURL = await getDownloadURL(fileRef);

      // 6) Build Firestore document (single address field)
      const userData: UserData = {
        uid: user.uid,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber, // never empty
        role: formData.userType,
        createdBy: user.uid,
        createdAt: Timestamp.fromDate(now),
        updatedAt: Timestamp.fromDate(now),
        status: 'pending',
        emailVerified: false,
        address: {
          text: addressToGeocode,
          lat,
          lng,
        },
      };

      if (formData.userType === 'merchant') {
        userData.businessName = formData.businessName;
        userData.businessPermit = formData.businessPermit;
        userData.logoURL = fileURL;
      }

      if (formData.userType === 'rider') {
        userData.vehicleUnit = formData.vehicleUnit;
        userData.driverLicenseNumber = formData.driverLicenseNumber;
        userData.plateNumber = formData.plateNumber;
        userData.profilePhotoURL = fileURL;
      }

      if (formData.userType === 'washer') {
        userData.experience = formData.experience;
        userData.profilePhotoURL = fileURL;
      }

      // 7) Write to Firestore
      await setDoc(doc(db!, 'users', user.uid), userData);

      // 8) Reset form state
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        userType: 'rider',
        vehicleUnit: '',
        driverLicenseNumber: '',
        plateNumber: '',
        businessName: '',
        businessPermit: '',
        businessAddress: '',
        experience: '',
      });
      setFile(null);
      setSuccess(true);
    } catch (err: unknown) {
      console.error('Registration error:', err);
      let errorMessage = 'An error occurred';
      if (err instanceof Error) {
        errorMessage = err.message;
        if ((err as any).code === 'auth/email-already-in-use') {
          errorMessage = 'This email is already registered.';
        } else if ((err as any).code === 'auth/weak-password') {
          errorMessage = 'Password should be at least 6 characters.';
        } else if ((err as any).code === 'auth/invalid-email') {
          errorMessage = 'Please enter a valid email address.';
        } else if ((err as any).code === 'auth/too-many-requests') {
          errorMessage = 'Too many attempts. Please try again later.';
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
      <section id="registration" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
                Join Our Platform
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Register as a Rider, Merchant, or Individual Washer and become part
                of our growing community.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <LeftSidePanel activeTab={activeTab} />

                <div className="md:w-1/2 p-6 md:p-10">
                  <TabButtons
                      activeTab={activeTab}
                      handleTabChange={handleTabChange}
                  />

                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Register as{' '}
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                  </h3>

                  {error && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        <strong>Error:</strong> {error}
                      </div>
                  )}
                  {success && (
                      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                        <strong>Success!</strong> Your registration is complete.
                        Please check your email to verify your account.
                      </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput
                          id="firstName"
                          name="firstName"
                          label="First Name *"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="First Name"
                          required
                          className={baseInputClasses}
                      />
                      <FormInput
                          id="lastName"
                          name="lastName"
                          label="Last Name *"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Last Name"
                          required
                          className={baseInputClasses}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput
                          id="email"
                          name="email"
                          label="Email *"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="email@example.com"
                          required
                          className={baseInputClasses}
                      />
                      <FormInput
                          id="phoneNumber"
                          name="phoneNumber"
                          label="Phone Number *"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          placeholder="0917xxxxxxx"
                          required
                          className={baseInputClasses}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Always show password field */}
                      <FormInput
                          id="password"
                          name="password"
                          label="Password *"
                          type="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="At least 6 characters"
                          required
                          className={baseInputClasses}
                      />

                      {/* Single address field for all roles */}
                      <FormInput
                          inputRef={addressRef}
                          id="businessAddress"
                          name="businessAddress"
                          label={
                            activeTab === 'merchant'
                                ? 'Business Address *'
                                : activeTab === 'washer'
                                    ? 'Business Address *'
                                    : 'Full Address *'
                          }
                          value={formData.businessAddress}
                          onChange={handleChange}
                          placeholder="Full Address"
                          required
                          className={baseInputClasses}
                      />
                    </div>

                    {/* Render the rest of the role-specific inputs */}
                    {renderRoleSpecificFields()}

                    <div className="flex justify-center mt-6">
                      <SubmitButton loading={loading} />
                    </div>
                  </form>

                  <p className="text-center text-gray-500 text-sm mt-4">
                    By registering, you agree to our{' '}
                    <a href="#" className="text-sky-700 hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-sky-700 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Registration;
