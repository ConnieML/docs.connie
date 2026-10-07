---
sidebar_label: "Hold Time Limit"
sidebar_position: 3
title: "Hold Time Limit — send waiting callers to voicemail"
description: "Set a maximum time a caller waits on hold for a program before Connie offers them voicemail."
---

# Hold Time Limit

A **hold time limit** caps how long a caller waits on hold for one of your programs. When the limit
is reached, Connie takes the caller out of the queue and asks them to leave a message. The message
arrives as a voicemail task in the same program's queue.

It is set **per program**. One program can have a 5-minute limit while another has none.

## What the caller hears

While they wait, callers hear your normal hold experience, including the option to press the star
key for a callback or voicemail at any time. When the limit is reached they hear:

> *"All of our team members are still helping other callers. Please leave a message at the tone.
> When you are finished recording, you may hang up, or press the star key."*

:::note It is close to the limit, not to the second
Connie checks the limit each time the hold music comes round, so a caller reaches voicemail at the
limit or up to about a minute after it. A 5-minute limit means voicemail between 5 and 6 minutes.
:::

## What your team gets

The same voicemail task your team already works:

- the **recording** and a **written transcript**,
- the **caller's number** and the **client card** when the caller is known,
- an **email** to the program's voicemail list, with the transcript,
- **96 hours** in the queue, like every voicemail. See
  [How Long a Task Stays in Your Queue](/end-users/staff-agents/handling-tasks/how-long-tasks-last).

## What it does to your reporting

A caller who reaches the limit is recorded as **`Hold limit reached - sent to voicemail`**. It is
**not** counted as an abandoned call. The caller didn't give up; Connie moved them on so their message
could be heard. The voicemail is linked to the original call, so the two can be read together.

## Decide this before you ask for it

:::warning A limit ends the wait for an agent
Once a caller reaches the limit, nobody can answer that call any more. The caller leaves a message
instead. Pick a limit that matches how long your callers can reasonably hold, and how quickly your
team can return a message.
:::

## How to set or change a limit

Open a support ticket with the **program** (for example, "Adult Day Care") and the **limit in
minutes**. The Connie Care Team sets it, places a test call to confirm it, and closes the ticket.
Removing or changing a limit works the same way.

[Get support →](/get-support/overview)

## Built-in protection on every program

Every program that holds callers in a queue has a safety net, whether or not it has a limit. If a
caller's place in the queue ends while they are still holding, Connie sends them to voicemail rather
than leaving them listening to hold music that no agent can answer.

Related: **[Agent Send to Voicemail](/end-users/administrators/channels/voice/voicemail/agent-send-to-voicemail)** lets an agent send a ringing caller
to voicemail by hand.
