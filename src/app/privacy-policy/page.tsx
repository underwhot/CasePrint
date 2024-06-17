import TagH2 from "@/components/tag-h2";

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-10">
      <TagH2 accent="Privacy">Privacy Policy</TagH2>
      <div className="mx-auto max-w-[700px] space-y-4">
        <p>
          This is the default privacy policy for this website. You can replace
          this text with your actual privacy policy. It should detail how you
          collect, use, and store user data. Be sure to address aspects like
          cookies, data retention, and user rights.
        </p>

        <p>
          We are committed to protecting the privacy of our users. This privacy
          policy explains what information we collect, how we use it, and how we
          protect it.
        </p>

        <p className="font-bold">Information We Collect</p>
        <ul>
          <li>
            Personal information you provide, such as name, email address, and
            contact information.
          </li>
          <li>
            Information collected automatically, such as browsing data and IP
            address.
          </li>
        </ul>

        <p className="font-bold">How We Use Your Information</p>
        <ul>
          <li>To provide and improve our services.</li>
          <li>To personalize your experience.</li>
          <li>To communicate with you.</li>
          <li>For security and compliance purposes.</li>
        </ul>

        <p className="font-bold">Your Rights</p>
        <ul>
          <li>
            You have the right to access, correct, and delete your personal
            information.
          </li>
          <li>You can opt out of receiving marketing communications.</li>
        </ul>

        <p className="font-bold">Contact Us</p>
        <p>
          If you have any questions about this privacy policy, please contact us
          at mail@example.com.
        </p>
      </div>
    </div>
  );
}
