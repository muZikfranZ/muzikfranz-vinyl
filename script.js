fetch('dates.json')
  .then(response => response.json())
  .then(data => {
    const now = new Date();
    const upcoming = [];
    const past = [];

    data.sort((a, b) => new Date(b.date) - new Date(a.date));

    data.forEach(event => {
      const eventDate = new Date(event.date + 'T00:00:00');
      const formatted = `<li class="${eventDate < now ? 'past' : ''}"><strong>${formatDate(event.date)}, ${event.time}</strong> – ${event.title}</li>`;
      if (eventDate >= now) {
        upcoming.unshift(formatted);
      } else {
        past.push(formatted);
      }
    });

    document.getElementById('upcoming').innerHTML = upcoming.join('');
    document.getElementById('past').innerHTML = past.join('');
  });

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-');
  return `${d}.${m}.${y}`;
}
