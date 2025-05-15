const credentials = { username: "Hema", password: "sreesai@1" };

function loginUser() {
  const uname = document.getElementById("username").value;
  const pwd = document.getElementById("password").value;

  if (uname === credentials.username && pwd === credentials.password) {
    document.getElementById("login-box").style.display = 'none';
    document.getElementById("invoice-box").style.display = 'block';
    calculateTotal();
    if (!document.getElementById("invoice-number").value.trim()) {
      generateInvoiceNumber();
    }
  } else {
    alert("Invalid credentials. Try admin / admin123");
  }
  return false;
}

function addRow() {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><input type="text"></td>
    <td style="text-align:center;"><input type="checkbox" checked></td>
    <td><input type="number" class="amount" oninput="calculateTotal()"></td>
  `;
  document.getElementById("items").appendChild(row);
}

function calculateTotal() {
  const amountInputs = document.querySelectorAll('.amount');
  let subtotal = 0;
  amountInputs.forEach(input => {
    subtotal += parseFloat(input.value) || 0;
  });
  const sgst = subtotal * 0.09;
  const cgst = subtotal * 0.09;
  const other = parseFloat(document.getElementById("other").value) || 0;
  const total = subtotal + sgst + cgst + other;

  document.getElementById("subtotal").innerText = subtotal.toFixed(2);
  document.getElementById("sgst").innerText = sgst.toFixed(2);
  document.getElementById("cgst").innerText = cgst.toFixed(2);
  document.getElementById("total").innerText = total.toFixed(2);
}

function generateInvoiceNumber() {
  const stored = localStorage.getItem("invoice-sequence") || "0000";
  let next = (parseInt(stored, 10) + 1).toString().padStart(4, '0');
  localStorage.setItem("invoice-sequence", next);
  document.getElementById("invoice-number").value = next;
  document.getElementById("invoice-date").valueAsDate = new Date();
}

document.getElementById("login-box").style.display = 'flex';
