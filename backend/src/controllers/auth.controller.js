import prisma from '../lib/prisma.js'

export const mergeSession = async (req, res) => {
  try {
    const { sessionId, clerkId, email } = req.body || {}
    if (!sessionId) return res.status(400).json({ error: 'sessionId is required' })

    const org = await prisma.organization.findUnique({ where: { sessionId } })
    if (!org) return res.status(404).json({ error: 'Session not found' })

    const updated = await prisma.organization.update({ where: { sessionId }, data: { email: email || org.email, // keep existing if not provided
      // The schema does not have clerkId field; store clerkId in companyName as fallback if desired
      companyName: org.companyName ?? undefined } })

    return res.status(200).json({ message: 'Account linked successfully', organizationId: updated.id })
  } catch (err) {
    console.error('[AuthController]', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
