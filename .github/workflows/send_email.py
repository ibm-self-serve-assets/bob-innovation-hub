import json, os, urllib.request, urllib.error, sys

# Read from NOTIFY_EMAIL secret (comma-separated); fall back to hardcoded list
# if the secret is empty (GitHub Actions blanks secrets containing commas in env vars)
notify_email = os.environ.get("NOTIFY_EMAIL", "").strip()
if notify_email:
    to_list = [e.strip() for e in notify_email.split(",") if e.strip()]
else:
    to_list = ["anand.awasthi@in.ibm.com", "suyash.gupte2@ibm.com"]

body = "\n".join([
    "A content update was made via Pages CMS.",
    "",
    "Repo:    " + os.environ.get("COMMIT_REPO", ""),
    "Branch:  " + os.environ.get("COMMIT_BRANCH", ""),
    "Author:  " + os.environ.get("COMMIT_AUTHOR", "") + " (" + os.environ.get("COMMIT_EMAIL", "") + ")",
    "File:    " + os.environ.get("CMS_FILE", ""),
    "Message: " + os.environ.get("COMMIT_MSG", ""),
    "",
    "Edit in Pages CMS: " + os.environ.get("CMS_URL", ""),
    "",
    "View commit: " + os.environ.get("COMMIT_URL", ""),
])

payload = {
    "emailTo":      to_list,
    "emailCC":      [],
    "emailFrom":    os.environ.get("MAIL_USERNAME", ""),
    "emailSubject": "Content updated in bob-innovation-hub",
    "emailBody":    body,
}

print("Sending payload:", json.dumps(payload, indent=2), flush=True)

data = json.dumps(payload).encode()
req = urllib.request.Request(
    "https://email-service.1yeewjjgn169.us-east.codeengine.appdomain.cloud/send-email",
    data=data,
    headers={"Content-Type": "application/json", "accept": "application/json"},
    method="POST",
)
try:
    with urllib.request.urlopen(req) as resp:
        print(resp.status, resp.read().decode(), flush=True)
except urllib.error.HTTPError as e:
    print("HTTP Error:", e.code, e.read().decode(), flush=True)
    sys.exit(1)
except urllib.error.URLError as e:
    print("URL Error:", e.reason, flush=True)
    sys.exit(1)
