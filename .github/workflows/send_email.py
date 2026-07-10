import json, os, urllib.request

# NOTIFY_TO is a comma-separated string e.g. "a@ibm.com, b@ibm.com"
to_list = [e.strip() for e in os.environ.get("NOTIFY_TO", "").split(",") if e.strip()]

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

data = json.dumps(payload).encode()
req = urllib.request.Request(
    "https://email-service.1yeewjjgn169.us-east.codeengine.appdomain.cloud/send-email",
    data=data,
    headers={"Content-Type": "application/json", "accept": "application/json"},
    method="POST",
)
try:
    with urllib.request.urlopen(req) as resp:
        print(resp.status, resp.read().decode())
except urllib.error.HTTPError as e:
    print("HTTP Error:", e.code, e.read().decode())
    raise
