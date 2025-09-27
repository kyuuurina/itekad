import { useState } from "react";

export default function ClassicUploads() {
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({
    applicationForm: false,
    ic: false,
    ssm: false,
    bankStatements: false,
    businessProof: false,
  });

  const handleFileUpload = (docType: string, file: File) => {
    // Simulate file upload - in a real app, this would upload to a server
    console.log(`Uploading ${docType}:`, file.name);

    // Auto-mark all documents as uploaded successfully
    setUploadedDocs({
      applicationForm: true,
      ic: true,
      ssm: true,
      bankStatements: true,
      businessProof: true,
    });
  };

  return (
    <div className="space-y-3 text-left">
      <UploadButton
        label="📄 Upload Application Form"
        docType="applicationForm"
        isUploaded={uploadedDocs.applicationForm}
        onFileUpload={handleFileUpload}
      />
      <UploadSection
        mainLabel="📄 Upload IC"
        docType="ic"
        isUploaded={uploadedDocs.ic}
        summary="How to upload IC?"
        detail="Take a clear photo of front and back of your MyKad. Ensure all text is visible."
        onFileUpload={handleFileUpload}
      />
      <UploadSection
        mainLabel="📄 Upload SSM"
        docType="ssm"
        isUploaded={uploadedDocs.ssm}
        summary="How to upload SSM?"
        detail="Apply via SSM portal. Download/print the certificate, then upload."
        link={{ href: "https://www.ssm.com.my", text: "SSM portal" }}
        onFileUpload={handleFileUpload}
      />
      <UploadSection
        mainLabel="📄 Upload Bank Statements"
        docType="bankStatements"
        isUploaded={uploadedDocs.bankStatements}
        summary="How to upload Bank Statements?"
        detail="Login to your bank app → e‑Statements → Download PDF. Upload here."
        onFileUpload={handleFileUpload}
      />
      <UploadSection
        mainLabel="📸 Upload Business Proof"
        docType="businessProof"
        isUploaded={uploadedDocs.businessProof}
        summary="What counts as proof?"
        detail="Receipts, supplier invoices, stall rental, menu, shop photos."
        onFileUpload={handleFileUpload}
      />
    </div>
  );
}

function UploadButton({
  label,
  docType,
  isUploaded,
  onFileUpload,
}: {
  readonly label: string;
  readonly docType: string;
  readonly isUploaded: boolean;
  readonly onFileUpload: (docType: string, file: File) => void;
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(docType, file);
    }
  };

  return (
    <div className="relative">
      <button
        className={`w-full py-2 rounded-lg text-left px-3 flex items-center justify-between ${
          isUploaded
            ? "bg-green-50 border-2 border-green-200 text-green-800"
            : "bg-white border border-gray-300 hover:border-gray-400"
        }`}
        onClick={() =>
          document.getElementById(`file-input-${docType}`)?.click()
        }
      >
        <span>{isUploaded ? "✅ Uploaded successfully" : label}</span>
        {isUploaded && <span className="text-green-600">✓</span>}
      </button>
      <input
        id={`file-input-${docType}`}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

function UploadSection({
  mainLabel,
  docType,
  isUploaded,
  summary,
  detail,
  link,
  onFileUpload,
}: {
  readonly mainLabel: string;
  readonly docType: string;
  readonly isUploaded: boolean;
  readonly summary: string;
  readonly detail: string;
  readonly link?: { href: string; text: string };
  readonly onFileUpload: (docType: string, file: File) => void;
}) {
  return (
    <div className="space-y-1">
      <UploadButton
        label={mainLabel}
        docType={docType}
        isUploaded={isUploaded}
        onFileUpload={onFileUpload}
      />
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
