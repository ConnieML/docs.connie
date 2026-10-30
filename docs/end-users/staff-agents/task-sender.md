---
id: task-sender
slug: /end-users/staff-agents/task-sender
sidebar_label: "Task Sender (Send button)"
title: "ThreadConnect Task Sender: Transfer, Hand off, Refer out"
description: "One Send button for every task. Transfer it to a coworker or department in ThreadConnect, hand it off to a coworker who doesn't use ThreadConnect, or refer it out to another organization."
sidebar_position: 3.5
---

# ThreadConnect Task Sender

## What is the Task Sender?

When a task needs to go to someone else, you use one button: **Send**. It sits at the top of every task you are working on. Press it, and ThreadConnect shows you only the choices that make sense for that task.

![The Send button at the top of a live web chat, opened to show the Transfer choice: "To a coworker or department on ThreadConnect. ThreadConnect keeps tracking it."](/img/features/task-sender/send-menu-live-chat.png)

*On a live web chat, the Send menu shows only **Transfer**, because someone is waiting with you.*

## Your three choices

| Choice | What it does | Does ThreadConnect keep track? |
|---|---|---|
| **Transfer** | Sends the task to a coworker or a department in ThreadConnect. | **Yes.** It stays in ThreadConnect. |
| **Hand off** | Emails it to a coworker who does **not** use ThreadConnect (for example, someone in the front office). | **No.** It leaves ThreadConnect and closes. |
| **Refer out** | Emails it to someone at **another organization** (a clinic, a partner agency, a caseworker). | **No.** It leaves ThreadConnect and closes. |

Easy way to remember it: **Transfer keeps it. Hand off and Refer out let it go.**

```mermaid
flowchart LR
    S([Send]) --> T[Transfer<br/>to a coworker or department]
    S --> H[Hand off<br/>to a coworker without ThreadConnect]
    S --> R[Refer out<br/>to another organization]
    T --> K[Stays in ThreadConnect<br/>ThreadConnect keeps track]
    H --> L[Leaves ThreadConnect by email<br/>the task closes]
    R --> L
```

## Which tasks can use which choice

| Task type | Transfer | Hand off | Refer out |
|---|---|---|---|
| 📞 Phone call (someone is on the line) | ✅ | ❌ | ❌ |
| 💬 Web chat (someone is typing to you) | ✅ | ❌ | ❌ |
| 📱 Text message | ✅ | ❌ | ❌ |
| 🎙️ Voicemail | ✅ | ✅ | ✅ |
| 📠 Fax | ✅ | ✅ | ✅ |
| 📝 Web form | ✅ | ✅ | ✅ |
| ✉️ Email | ✅ | ✅ | ✅ |

**Why can't I hand off or refer out a call, chat or text?** Because a real person is waiting with you right now. Hand off and Refer out work by email, and you can't email someone who is on the phone with you. For a live person, use **Transfer** (or connect a caller to an outside number using the **External** tab or the dial pad).

## How to Transfer

### A phone call, web chat or text (someone is waiting)

1. Press **Send**, then **Transfer**.
2. The transfer list opens. Pick a coworker (**Agent** tab) or a department (**Queues** tab).
3. On a phone call you can also talk to them first (warm) or pass it straight over (cold).

![The Transfer list on a live web chat, with the Agent and Queues tabs, a search box, and a list of departments such as Donation Inquiries, Everyone, Rapid Response, Sales, Support and Volunteer Inquiries](/img/features/task-sender/transfer-list-queues.png)

*The transfer list. Use **Agent** for a coworker or **Queues** for a department.*

### A voicemail, fax, web form or email

1. Press **Send**, then **Transfer**.
2. Choose a **department** or a **coworker** from the list.
3. Fax, web form and email: choose a **disposition** (and add a note if you like). This records how you handled it, because your copy closes as soon as you transfer it.
4. Press **Transfer**.
5. Voicemail: after the transfer, pick your disposition in wrap-up and press **Complete**.

![The Transfer box on a web form task, with a department chosen, a Disposition list, a Notes box, and a warning that the department is closed right now](/img/features/task-sender/transfer-box-web-form-closed.png)

*The Transfer box on a web form. Here the department is closed, so ThreadConnect asks before sending (see below).*

## How to Hand off or Refer out

1. Press **Send**, then **Hand off** (coworker without ThreadConnect) or **Refer out** (another organization).
2. Pick the person from the list.
3. Press **Send**. ThreadConnect asks you to check: *"This closes the task in ThreadConnect. Nobody here will be reminded about it."* Press **Send** again to confirm.
4. Pick a disposition in wrap-up and press **Complete**.

The person receives an email with everything attached: the recording and transcript for a voicemail, the document for a fax or form, or the full email with its attachments.

### Who shows up in the list?

People in your contacts who have an **email address** saved.

- **Hand off** shows people whose email is at **your own organization**.
- **Refer out** shows everyone else.
- Your **My Contacts** are private: only you see them and only you can send to them.
- **Shared Contacts** are your organization's address book; an admin or supervisor looks after them. (Admins: see [Shared Contacts & External Referrals](/end-users/administrators/shared-contacts-and-referrals).)

## "This department is closed right now"

If you transfer to a department that is closed, ThreadConnect checks with you first:
*"This department is closed right now. Nobody is there to pick it up in [department] until it reopens. Transfer anyway?"*

![A message reading "This department is closed right now. Nobody is there to pick it up in Rapid Response until it reopens. Transfer anyway?" with Cancel and Transfer anyway buttons](/img/features/task-sender/closed-department-warning.png)

- Press **Cancel** to keep the task. Nothing moves.
- Press **Transfer anyway** if you still want to send it.

Good to know: ThreadConnect only warns about **closed** departments. If a department is open but everyone is busy, the task waits there for the next free person.

## Good to know

- **Hand off and Refer out close the task in ThreadConnect.** ThreadConnect will not remind anyone or follow up.
- **Replies to that email do not come back into ThreadConnect.** It is sent from a ThreadConnect address, not from your own inbox. If you need an answer, ask the person to call or email you directly. (If the client who first wrote to you writes in again, that arrives as a **new task**.)
- **A contact with no email** will not appear under Hand off or Refer out. Ask your admin to add one.
- **Every move is recorded** on the task: what was transferred, handed off or referred out, by whom and when.

:::note Don't see the Send button?
The Task Sender is switched on for each organization by the ThreadConnect team. Until it is switched on for you, a voicemail, fax or web form shows a **Route this task** button (a small share icon) at the top instead. It opens one box with two parts: **Hand off to a queue** moves the task to another department in ThreadConnect, and **Refer out to a partner** emails it to a Shared Contact that has an email address. Phone calls, chats, texts and emails keep the transfer arrow. If you're not sure which one you have, ask your supervisor.
:::

## Need help?

Ask your supervisor, or contact ThreadConnect support from the **Get Support** button in Agent Tools. You can also visit [Get Support](/get-support/overview).

**Related:** [Transferring Tasks](/end-users/staff-agents/transferring-tasks) · [Handing Off & Referring Out](/end-users/staff-agents/handing-off-tasks) · [Parking Tasks](/end-users/staff-agents/parking-tasks)
