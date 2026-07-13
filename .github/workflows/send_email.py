import json, os, re, urllib.parse, urllib.request, urllib.error, sys

# Read from NOTIFY_EMAIL secret (comma-separated); fall back to hardcoded list
# if the secret is empty (GitHub Actions blanks secrets containing commas in env vars)
notify_email = os.environ.get("NOTIFY_EMAIL", "").strip()
if notify_email:
    to_list = [e.strip() for e in notify_email.split(",") if e.strip()]
else:
    to_list = ["anand.awasthi@in.ibm.com", "suyash.gupte2@ibm.com"]

# Build CMS edit URL from the commit message
# Pages CMS always writes: "Update _collection/file.md (via Pages CMS)"
commit_msg = os.environ.get("COMMIT_MSG", "")
commit_url = os.environ.get("COMMIT_URL", "")

m = re.search(r'(?:Update|Create|Delete)\s+(\S+\.md)', commit_msg)
cms_file = m.group(1) if m else ""

if cms_file:
    encoded    = urllib.parse.quote(cms_file, safe="")
    collection = re.sub(r"^_", "", cms_file.split("/")[0])
    cms_url    = (
        "https://app.pagescms.org/ibm-self-serve-assets/bob-innovation-hub"
        f"/main/collection/{collection}/edit/{encoded}"
    )
else:
    cms_url = "https://app.pagescms.org/ibm-self-serve-assets/bob-innovation-hub"

print(f"Detected file: {cms_file}", flush=True)
print(f"CMS URL:       {cms_url}", flush=True)

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
    repo       = os.environ.get("COMMIT_REPO", ""),
    branch     = os.environ.get("COMMIT_BRANCH", ""),
    author     = os.environ.get("COMMIT_AUTHOR", ""),
    email      = os.environ.get("COMMIT_EMAIL", ""),
    file       = cms_file if cms_file else "<em>unknown</em>",
    message    = commit_msg,
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

print("Sending to:", to_list, flush=True)

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
