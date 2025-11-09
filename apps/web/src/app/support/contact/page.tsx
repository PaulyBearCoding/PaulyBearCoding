import { Mail } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold">Contact Support</h1>
      <p className="mt-4 text-muted-foreground">
        We're here to help. Get in touch with our support team.
      </p>

      <div className="mt-12 space-y-8">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3">
            <Mail className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold">Email Support</h3>
              <p className="text-sm text-muted-foreground">
                Get help via email
              </p>
            </div>
          </div>
          <a
            href="mailto:support@gjyl.local"
            className="mt-4 inline-block text-sm text-primary hover:underline"
          >
            support@gjyl.local
          </a>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Common Questions</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>• Account and login issues</li>
            <li>• Privacy and security questions</li>
            <li>• Technical support</li>
            <li>• Feature requests and feedback</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
