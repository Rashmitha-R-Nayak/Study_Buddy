import React from "react";
import TeamMember from "../_components/common/TeamMember";

export default function page() {
  return (
    <div className="mx-auto px-12 py-10 text-center bg-gray-900 text-gray-800">
      {/* About Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-lg shadow-md p-8 my-10">
        <h2 className="text-4xl font-extrabold mb-6">About</h2>
        <p className="text-lg mb-4">
          StudyBuddy is your ultimate companion for mastering your study
          material. With the power to quickly extract relevant information from
          PDFs, we streamline the study process and help you focus on what truly
          matters—learning and success. No more tedious searches; let StudyBuddy
          guide you with precision and speed.
        </p>
        <p className="text-lg">
          Our focus on privacy and security ensures your data stays protected.
          With robust encryption, seamless user authentication, and secure
          storage, you can use StudyBuddy confidently, knowing your materials
          are safe. We are committed to helping students succeed smarter, not
          harder.
        </p>
      </section>

      {/* Team Section */}
      <div className="flex flex-wrap justify-center gap-16">
        <TeamMember
          name="Darshan Kotian"
          role="Project Lead & Backend Developer"
          imageSrc="https://via.placeholder.com/100"
        />
        <TeamMember
          name="Ronith J Salian"
          role="Frontend Developer"
          imageSrc="https://via.placeholder.com/100"
        />
        <TeamMember
          name="Himanshu"
          role="Frontend Developer"
          imageSrc="https://via.placeholder.com/100"
        />
        <TeamMember
          name="Rashmitha R Nayak"
          role="Frontend Developer"
          imageSrc="https://via.placeholder.com/100"
        />
      </div>
    </div>
  );
}
