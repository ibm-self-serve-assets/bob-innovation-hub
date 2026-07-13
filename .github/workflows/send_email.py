import json, os, urllib.request, urllib.error, sys

# Read from NOTIFY_EMAIL secret (comma-separated); fall back to hardcoded list
# if the secret is empty (GitHub Actions blanks secrets containing commas in env vars)
notify_email = os.environ.get("NOTIFY_EMAIL", "").strip()
if notify_email:
    to_list = [e.strip() for e in notify_email.split(",") if e.strip()]
else:
    to_list = ["anand.awasthi@in.ibm.com", "suyash.gupte2@ibm.com"]

cms_url    = os.environ.get("CMS_URL", "")
commit_url = os.environ.get("COMMIT_URL", "")
cms_file   = os.environ.get("CMS_FILE", "")

body = """<html><body style="font-family:sans-serif;font-size:14px;color:#1f2328;">
<p>A content update was made via <strong>Pages CMS</strong>.</p>
<table style="border-collapse:collapse;">
  <tr><td style="padding:2px 12px 2px 0;color:#57606a;white-space:nowrap;">Repo</td>    <td>{repo}</td></tr>
  <tr><td style="padding:2px 12px 2px 0;color:#57606a;white-space:nowrap;">Branch</td>  <td>{branch}</td></tr>
  <tr><td style="padding:2px 12px 2px 0;color:#57606a;white-space:nowrap;">Author</td>  <td>{author} ({email})</td></tr>
  <tr><td style="padding:2px 12px 2px 0;color:#57606a;white-space:nowrap;">File</td>    <td>{file}</td></tr>
  <tr><td style="padding:2px 12px 2px 0;color:#57606a;white-space:nowrap;">Message</td> <td>{message}</td></tr>
</table>
<p style="margin-top:16px;">
  <a href="{cms_url}" style="display:inline-block;margin-right:16px;">&#9998; Edit in Pages CMS</a>
  <a href="{commit_url}">&#128279; View commit</a>
</p>
</body></html>""".format(
    repo    = os.environ.get("COMMIT_REPO", ""),
    branch  = os.environ.get("COMMIT_BRANCH", ""),
    author  = os.environ.get("COMMIT_AUTHOR", ""),
    email   = os.environ.get("COMMIT_EMAIL", ""),
    file    = cms_file if cms_file else "<em>unknown</em>",
    message = os.environ.get("COMMIT_MSG", ""),
    cms_url    = cms_url,
    commit_url = commit_url,
)

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
