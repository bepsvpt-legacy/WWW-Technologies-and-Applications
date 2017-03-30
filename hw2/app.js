function submit () {
  const dom = document.querySelector('#path')

  if (! dom.value.length) {
    return alert('Error, Please input XML url.')
  }

  window.open(`./index.html#${dom.value}`)
}

document.onreadystatechange = () => {
  if ('interactive' === document.readyState) {
    const dom = document.body
    const type = location.hash.substr(1)

    if (! type.length) {
      dom.innerHTML = `
<div class="home">
  <h1>Enter XML File</h1>
  <input id="path" size="65">
  <a href="MLB.xml">View XSL result for MLB.xml</a>
  <button onclick="submit()">Submit Query</button>
</div>`
    } else {
      fetch(type).then(response => {
        return response.text()
      }).then(body => {
        xml = new DOMParser().parseFromString(body, 'application/xml')

        if (type.toLowerCase().includes('train')) {
          dom.insertAdjacentHTML('beforeend', '<h1>Train</h1>')

          xml.querySelectorAll('train').forEach(node => {
            let names = [], times = []

            for (let p = 2, q = 3; p <= 10; p += 2, q += 2) {
              names.push(`<span>${node.children[p].textContent}</span>`)
              times.push(`<span>${node.children[q].textContent}</span>`)
            }

            dom.insertAdjacentHTML('beforeend', `
<div style="width: 20rem;">
  <p class="train-name">${node.children[1].textContent} - ${node.children[0].textContent}</p>
  <div class="site-name">${names.join('<span> → </span>')}</div>
  <div class="site-time">${times.join('')}</div>
</div>
`)
          })
        } else {
          dom.insertAdjacentHTML('beforeend', '<h1>Baseball</h1>')

          xml.querySelectorAll('baseball').forEach(node => {
            dom.insertAdjacentHTML('beforeend', `
<table style="width: 640px; background-color: ${node.children[3].textContent.toLowerCase()}; color: ${node.children[2].textContent.toLowerCase()};">
  <tbody>
    <tr>
      <td colspan="5"><b>${node.children[0].textContent}</b></td>
    </tr>
    <tr>
      <td>Image</td>
      <td colspan="2">star</td>
      <td>Coach</td>
      <td>League</td>
    </tr>
    <tr>
      <td><img src="${node.children[4].textContent}" class="baseball-logo"></td>
      <td>${node.children[5].children[0].textContent}</td>
      <td>Birth: ${node.children[5].children[1].textContent}</td>
      <td>${node.children[6].textContent}</td>
      <td>${node.children[1].textContent}</td>
    </tr>
    <tr>
      <td colspan="5">
        <iframe width="640" height="360" src="${node.children[7].textContent}" frameborder="0" allowfullscreen></iframe>
      </td>
    </tr>
  </tbody>
</table>
`)
          })
        }
      })
    }
  }
}
