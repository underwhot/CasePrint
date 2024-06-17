import TagH2 from "@/components/tag-h2";

function TermsPage() {
  return (
    <div className="container py-10">
      <TagH2 accent="terms">Terms and Conditions</TagH2>
      <div className="mx-auto max-w-[700px] space-y-4">
        <p>
          These are the default terms and conditions for this website. You can
          replace this text with your actual terms. Please make sure your terms
          cover important aspects like user data, intellectual property,
          limitations of liability, and termination clauses.
        </p>

        <p>
          By using this website, you agree to be bound by these terms and
          conditions. If you disagree with any part of these terms and
          conditions, you may not access or use the website.
        </p>
      </div>
    </div>
  );
}

export default TermsPage;
