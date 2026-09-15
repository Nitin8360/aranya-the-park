/**
 * Enquiry Submission Service
 * 
 * Clean frontend form architecture with an isolated submission handler.
 * Ready for integration with real CRM webhooks (e.g. LeadSquared, Salesforce, HubSpot)
 * or custom backend REST APIs.
 */

export interface EnquiryPayload {
  fullName: string;
  phoneNumber: string;
  email?: string;
  configuration: '2 BHK' | '3 BHK' | '4 BHK' | 'All Configurations';
  contactMethod: 'WhatsApp' | 'Phone Call' | 'Email';
  message?: string;
  purpose: string;
  timestamp?: string;
}

export interface EnquiryResponse {
  success: boolean;
  leadId: string;
  message: string;
  timestamp: string;
}

const STORAGE_KEY = 'aranya_the_park_enquiries';

/**
 * Submits an enquiry payload.
 * When ready, replace the internal implementation with a real `fetch('/api/leads', ...)` call.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResponse> {
  const timestamp = new Date().toISOString();
  const leadId = `ATP-${Date.now().toString(36).toUpperCase()}`;

  const fullRecord = {
    ...payload,
    leadId,
    timestamp,
    status: 'registered',
  };

  // Simulate network latency (250ms) for smooth optimistic UI transition
  await new Promise((resolve) => setTimeout(resolve, 250));

  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.unshift(fullRecord);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.warn('Local storage write skipped:', err);
  }

  return {
    success: true,
    leadId,
    message: 'Your enquiry has been registered with the Aranya The Park sales desk.',
    timestamp,
  };
}

/**
 * Retrieve all registered leads from local storage (for debugging/admin inspection)
 */
export function getStoredEnquiries(): any[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}
