export default function ClassicUploads() {
  return (
    <div className="space-y-3 text-left">
      <UploadButton label="📄 Upload Application Form" />
      <UploadSection
        mainLabel="📄 Upload IC"
        summary="How to upload IC?"
        detail="Take a clear photo of front and back of your MyKad. Ensure all text is visible."
      />
      <UploadSection
        mainLabel="📄 Upload SSM"
        summary="How to upload SSM?"
        detail="Apply via SSM portal. Download/print the certificate, then upload."
        link={{ href: "https://www.ssm.com.my", text: "SSM portal" }}
      />
      <UploadSection
        mainLabel="📄 Upload Bank Statements"
        summary="How to upload Bank Statements?"
        detail="Login to your bank app → e‑Statements → Download PDF. Upload here."
      />
      <UploadSection
        mainLabel="📸 Upload Business Proof"
        summary="What counts as proof?"
        detail="Receipts, supplier invoices, stall rental, menu, shop photos."
      />
    </div>
  );
}

function UploadButton({ label }: { readonly label: string }) {
  return (
    <button className="w-full bg-white border py-2 rounded-lg text-left px-3">
      {label}
    </button>
  );
}

function UploadSection({
  mainLabel,
  summary,
  detail,
  link,
}: {
  readonly mainLabel: string;
  readonly summary: string;
  readonly detail: string;
  readonly link?: { href: string; text: string };
}) {
  return (
    <div className="space-y-1">
      <UploadButton label={mainLabel} />
      <details className="bg-gray-50 border rounded p-2 text-xs">
        <summary className="cursor-pointer font-semibold">{summary}</summary>
        <p className="mt-1">
          {detail}
          {link && (
            <span>
              {" "}
              <a
                href={link.href}
                target="_blank"
                className="text-blue-600 underline"
                rel="noreferrer"
              >
                {link.text}.
              </a>
            </span>
          )}
        </p>
      </details>
    </div>
  );
}
