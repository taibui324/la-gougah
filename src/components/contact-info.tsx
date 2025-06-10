"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

export function ContactInfo() {
  const contactInfo = useQuery(api.contactSettings.getPublicContactInfo);

  if (!contactInfo) {
    return null;
  }

  return (
    <div className="space-y-4">
      {contactInfo.email && (
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Mail className="h-5 w-5 text-blue-800" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium">
              <a
                href={`mailto:${contactInfo.email}`}
                className="hover:underline"
              >
                {contactInfo.email}
              </a>
            </p>
          </div>
        </div>
      )}

      {contactInfo.phone && (
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Phone className="h-5 w-5 text-blue-800" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Hotline</p>
            <p className="text-lg font-medium">
              <a href={`tel:${contactInfo.phone}`} className="hover:underline">
                {contactInfo.phone}
              </a>
            </p>
          </div>
        </div>
      )}

      {contactInfo.address && (
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-full mt-1">
            <MapPin className="h-5 w-5 text-blue-800" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Địa chỉ</p>
            <p className="text-lg font-medium">{contactInfo.address}</p>
          </div>
        </div>
      )}

      {contactInfo.socialLinks &&
        Object.values(contactInfo.socialLinks).some((link) => !!link) && (
          <div className="pt-4">
            <p className="text-sm text-gray-500 mb-2">Mạng xã hội</p>
            <div className="flex items-center gap-4">
              {contactInfo.socialLinks.facebook && (
                <a
                  href={contactInfo.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-100 p-3 rounded-full hover:bg-blue-200 transition-colors"
                >
                  <Facebook className="h-5 w-5 text-blue-800" />
                </a>
              )}

              {contactInfo.socialLinks.instagram && (
                <a
                  href={contactInfo.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-100 p-3 rounded-full hover:bg-blue-200 transition-colors"
                >
                  <Instagram className="h-5 w-5 text-blue-800" />
                </a>
              )}

              {contactInfo.socialLinks.twitter && (
                <a
                  href={contactInfo.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-100 p-3 rounded-full hover:bg-blue-200 transition-colors"
                >
                  <Twitter className="h-5 w-5 text-blue-800" />
                </a>
              )}

              {contactInfo.socialLinks.linkedin && (
                <a
                  href={contactInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-100 p-3 rounded-full hover:bg-blue-200 transition-colors"
                >
                  <Linkedin className="h-5 w-5 text-blue-800" />
                </a>
              )}
            </div>
          </div>
        )}
    </div>
  );
}
