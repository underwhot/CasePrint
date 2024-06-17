import TagH2 from "@/components/tag-h2";

export default function CookiePolicyPage() {
  return (
    <div className="container py-10">
      <TagH2 accent="Cookie">Cookie Policy</TagH2>
      <div className="mx-auto max-w-[700px] space-y-4">
        <p>
          This is the default cookie policy for this website. You can replace
          this text with your actual cookie policy. It should explain what
          cookies are, how you use them, and how users can control them.
        </p>
        <p className="font-bold">What are cookies?</p>
        <p>
          Cookies are small text files that are stored on your computer or
          mobile device by websites you visit. They are widely used to remember
          you and your preferences, such as login details, language settings,
          and browsing history.
        </p>
        <p className="font-bold">How We Use Cookies</p>
        <ul>
          <li>To make our website work as expected.</li>
          <li>
            To improve your browsing experience (e.g., remembering preferences).
          </li>
          <li>To analyze website usage and improve our services.</li>
          <li>For advertising purposes (if applicable).</li>
        </ul>
        <p className="font-bold">Controlling Cookies</p>
        <p>
          You can control and/or delete cookies as needed. Please refer to your
          web browser's documentation for instructions. Be aware that disabling
          cookies may limit your ability to use certain features of our website.
        </p>
        <p className="font-bold">Third-Party Cookies</p>
        <p>
          We may also use third-party cookies from partners like analytics
          providers or advertisers. You can typically manage these cookies
          through their own websites.
        </p>
        <p className="font-bold">Changes to This Policy</p>
        <p>
          We may update this cookie policy from time to time. Please check this
          page periodically for any changes.
        </p>
      </div>
    </div>
  );
}
