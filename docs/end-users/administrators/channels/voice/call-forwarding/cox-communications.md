---
sidebar_label: Cox Communications
sidebar_position: 2
title: "Forward Cox Communications Business Phone to Connie"
---

# Forward Cox Communications Business Phone to Connie

This guide walks you through setting up call forwarding from your Cox Communications business phone number to your Connie phone system.

:::tip The one setting that matters
Connie requires **"Always Forward"** (also called *unconditional forwarding*). The other forwarding options look like they are working but quietly send most calls to your old phone system instead of Connie. See [Choose the Forwarding Rule](#3-choose-the-forwarding-rule--select-always-forward) below.
:::

## Prerequisites

- ✅ Active Cox Communications business phone service
- ✅ Connie phone number (provided by your Connie administrator)
- ✅ Access to Cox Business Portal or phone system settings
- ✅ Administrative access to your Cox account

## Step-by-Step Setup

### 1. Access Cox Business Portal

1. Go to [Cox Business Portal](https://business.cox.com)
2. Sign in with your Cox business account credentials
3. Navigate to "Phone Services" or "Voice Services"

### 2. Configure Call Forwarding

1. Locate your business phone number in the portal
2. Look for "Call Forwarding" or "Forward Calls" settings
3. Enable call forwarding
4. Enter your Connie phone number as the forwarding destination

### 3. Choose the Forwarding Rule — select "Always Forward"

Cox offers several forwarding rules. **Only one of them works with Connie.**

| Cox setting | Use with Connie? | What actually happens |
|---|---|---|
| **Always Forward** | ✅ **Required** | Every call goes to Connie. This is the setting you want. |
| Forward When Busy | ❌ No | Only forwards if your line is already busy. Most calls never reach Connie. |
| Forward When No Answer | ❌ No | Forwards only after a set number of rings. If your old voicemail answers first, the "no answer" condition never triggers — so callers keep landing in your old voicemail and Connie never sees the call. |
| Forward When Unreachable | ❌ No | Only forwards during a service outage. |

:::warning Why this is easy to get wrong
The conditional options **do not produce an error**. Your line still rings, callers still get answered, and nothing looks broken — but the calls are reaching your old phone system instead of Connie. Your team simply sees no calls arriving and assumes Connie isn't working.

If you are unsure which rule is currently set, you can view it yourself in the [Cox Business Portal](https://business.cox.com), or ask Cox Business Support to read it back to you.
:::

### 4. Test the Setup

1. From a **mobile phone** (not an internal extension), call your Cox business number
2. You should hear your **Connie greeting** — and your old desk phones should **not** ring
3. **Confirm with your Connie administrator before considering it done**

:::danger Hearing the greeting is not proof on its own
A call dialed *directly* to your Connie number sounds **identical** to a call that arrived through the forward — same greeting, same routing, same staff member answering. You cannot tell them apart by ear.

Your Connie administrator can check Connie's records and confirm whether the call genuinely arrived through the Cox forward. **Always ask them to verify before announcing the line is live.** Skipping this step has previously led to a line being reported as working when the forward had never actually been switched on.
:::

**Test twice** — once during business hours and once after hours. A forward that works during the day but not at night usually means a schedule or a conditional rule is still in place.

## Troubleshooting

### Common Issues

**Your desk phones still ring, or callers reach your old voicemail:**
- The forward is not active. Re-open the portal and confirm the setting was **saved**, not just entered
- Confirm the rule is **Always Forward** — not "when busy" or "no answer"
- Ask your Connie administrator whether Connie received *any* record of the call. If Connie has no record at all, the call never left your provider

**Calls not forwarding:**
- Verify the Connie phone number is entered correctly, digit by digit
- Check that call forwarding is enabled
- Ensure your Cox service plan supports call forwarding

**Calls forwarding but not reaching Connie:**
- Contact your Connie administrator to verify the number is configured on Connie's side
- Check for any geographic restrictions on the forwarding number

**It works during the day but not evenings or weekends:**
- A time-of-day schedule or an auto-attendant rule is taking priority over the forward
- Ask Cox to confirm no schedule is applied to the line

**Partial forwarding:**
- Review your forwarding rules to ensure they match your needs
- Test different call scenarios (busy, no answer, etc.)

## Important Notes

- Call forwarding charges may apply from Cox Communications
- Some Cox business plans include free call forwarding
- You can disable forwarding at any time through the Cox portal — this is why we forward before porting: **rollback is immediate**
- Keep your Cox service active — canceling it will stop call forwarding

## Next Steps

After setting up call forwarding:
- [Return to the call forwarding overview](/end-users/administrators/channels/voice/call-forwarding)
- [Administrator getting started guide](/end-users/administrators/getting-started)
- Ask your Connie administrator to confirm the forward is verified on Connie's side

## Need Help?

If you encounter issues:
1. Contact Cox Business Support: 1-800-COX-BIZ1
2. Reach out to your Connie administrator — they can confirm what Connie is and isn't receiving
3. [Get Support](/get-support/overview)

---

*This guide was last updated: 17 August 2026. For the most current Cox procedures, consult your [Cox Business Portal](https://business.cox.com).*
