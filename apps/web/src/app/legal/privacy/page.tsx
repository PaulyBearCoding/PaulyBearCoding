export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <div className="prose prose-invert mt-8 max-w-none">
        <h2>1. Information We Collect</h2>
        <p>
          We collect information that you provide directly to us, including when
          you create an account, post content, or communicate with other users.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information we collect to provide, maintain, and improve our
          services, to communicate with you, and to protect GJYL and our users.
        </p>

        <h2>3. Information Sharing</h2>
        <p>
          We do not sell your personal information. We may share your information
          with your consent or as necessary to provide our services.
        </p>

        <h2>4. Data Security</h2>
        <p>
          We take reasonable measures to help protect your personal information
          from loss, theft, misuse, and unauthorized access.
        </p>

        <h2>5. Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal
          information. You can do this through your account settings or by
          contacting us.
        </p>

        <h2>6. Cookies</h2>
        <p>
          We use cookies and similar tracking technologies to track activity on
          our service and hold certain information.
        </p>

        <h2>7. Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify you
          of any changes by posting the new policy on this page.
        </p>

        <p className="mt-8 text-sm text-muted-foreground">
          For privacy-related questions, please contact{' '}
          <a href="mailto:privacy@gjyl.local">privacy@gjyl.local</a>
        </p>
      </div>
    </div>
  );
}
