// Reliable public tracker request. This runs only on index.html and prevents a
// stalled SDK request from stopping customer shipment details from rendering.
const trackerForm = document.getElementById('tracking-form');
if (trackerForm) {
  const projectUrl = 'https://dtzuagluzfshsvjfeoar.supabase.co';
  const publishableKey = 'sb_publishable_xzHBV3mB6Iwit2rX66TaVA_p55ZqrOg';
  const byId = id => document.getElementById(id);
  const hidden = new Set(['Shipment Key', 'Map X', 'Map Y']);
  const show = value => value == null || value === '' ? '—' : String(value);

  document.addEventListener('submit', async event => {
    if (event.target !== trackerForm) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const key = byId('shipment-key').value.trim();
    if (!key) return;

    const notice = byId('notice');
    const button = trackerForm.querySelector('button');
    notice.style.display = 'none';
    button.disabled = true;
    button.textContent = 'Tracking…';
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 12000);
      const response = await fetch(`${projectUrl}/rest/v1/rpc/get_public_tracking`, {
        method: 'POST',
        headers: {
          apikey: publishableKey,
          Authorization: `Bearer ${publishableKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ p_key: key }),
        signal: controller.signal
      });
      clearTimeout(timer);
      if (!response.ok) throw new Error(`Tracking service error (${response.status})`);
      const data = await response.json();
      if (!data) throw new Error('Shipment key not found. Please check it and try again.');

      byId('empty').style.display = 'none';
      byId('dashboard').style.display = 'block';
      const x = Math.max(0, Math.min(100, Number(data['Map X']) || 50));
      const y = Math.max(0, Math.min(100, Number(data['Map Y']) || 50));
      byId('map-pin').style.left = `${x}%`;
      byId('map-pin').style.top = `${y}%`;
      byId('progress').style.width = `${x}%`;
      byId('location-label').textContent = show(data.Location).toUpperCase();
      byId('current-status').textContent = show(data.Status);
      byId('estimated-arrival').textContent = show(data.ETA);
      byId('freight-method').textContent = show(data['Freight Method']).toUpperCase();
      byId('timeline-title').textContent = `${show(data.Status)} — ${show(data.Location)}`;
      byId('timeline-message').textContent = show(data.Message);
      const origin = document.querySelector('.route-info .city:first-child strong');
      const destination = document.querySelector('.route-info .city:last-child strong');
      if (origin && data['Origin Facility']) origin.textContent = data['Origin Facility'];
      if (destination && data['Delivery Destination']) destination.textContent = data['Delivery Destination'];
      const details = byId('shipment-details');
      details.replaceChildren();
      for (const [name, value] of Object.entries(data)) {
        if (hidden.has(name)) continue;
        const field = document.createElement('div'); field.className = 'field';
        const label = document.createElement('label'); label.textContent = name;
        const text = document.createElement('strong'); text.textContent = show(value);
        field.append(label, text); details.append(field);
      }
    } catch (error) {
      byId('dashboard').style.display = 'none';
      byId('empty').style.display = 'none';
      notice.textContent = error.name === 'AbortError' ? 'Tracking request timed out. Please try again.' : error.message;
      notice.style.display = 'block';
    } finally {
      button.disabled = false;
      button.textContent = 'Track shipment';
    }
  }, true);
}
