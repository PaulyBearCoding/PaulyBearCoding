export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <div className="prose prose-invert mt-8 max-w-none">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using GJYL, you accept and agree to be bound by the
          terms and provision of this agreement.
        </p>

        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily use GJYL for personal,
          non-commercial use only.
        </p>

        <h2>3. User Accounts</h2>
        <p>
          When you create an account with us, you must provide information that
          is accurate, complete, and current at all times.
        </p>

        <h2>4. Content</h2>
        <p>
          Our platform allows you to post, link, store, share and otherwise make
          available certain information, text, graphics, videos, or other
          material.
        </p>

        <h2>5. Privacy</h2>
        <p>
          Please review our Privacy Policy, which also governs your use of GJYL,
          to understand our practices.
        </p>

        <h2>6. Termination</h2>
        <p>
          We may terminate or suspend your account immediately, without prior
          notice or liability, for any reason whatsoever.
        </p>

        <p className="mt-8 text-sm text-muted-foreground">
          For questions about these terms, please contact{' '}
          <a href="mailto:support@gjyl.local">support@gjyl.local</a>
        </p>
      </div>
    </div>
  );
}
