var contactList = document.querySelector('.contactList');
var contacts = json;
var form = createForm();
var table = createTable();

function el(elem) {
  return document.createElement(elem);
}
function str(string){
  return document.createTextNode(string);
}

function createForm() {
  let form = el("form");
  let fieldset = el("fieldset");
  let legend = el("legend");
  let button = el("button");
  let fields = ["name","phone"];

  document.body.appendChild(form);
  form.appendChild(fieldset);
  fieldset.appendChild(legend).appendChild(str("Address Book"));
  formFields();
  fieldset.appendChild(button);
  button.appendChild(str("Add to contacts"));
  button.setAttribute("onclick", "createContact()");
  button.setAttribute("type", "button");
  button.setAttribute("class", "add-contact");
  button.setAttribute("name", "add-contact");

  function formFields() {
    for (var i = 0; i < fields.length; i++){
      let label = el("label");
      let input = el("input");
      let text = fields[i].charAt(0).toUpperCase() + fields[i].substring(1);
      fieldset.appendChild(label);
      fieldset.appendChild(input);

      label.setAttribute("class", fields[i] + "Label");
      label.setAttribute("for", fields[i]);
      label.appendChild(str(text));

      input.setAttribute("id", fields[i]);
      input.setAttribute("type", "text");
      input.setAttribute("name", fields[i]);
    }
    document.querySelector('#name').required = true;

  }
};

function createTable() {
  let table = el("table");
  let caption = el("caption");
  let thead = el("thead");
  let tbody = el("tbody");
  let tr = el("tr");
  let tableTitle = "Contacts"
  let count = contacts.length;

  document.body.appendChild(table).appendChild(caption).appendChild(str(tableTitle));
  table.appendChild(thead).appendChild(tr);
  table.appendChild(tbody);

  return {
    data: function() {
      for (let i = 0; i < contacts.length; i++) {
        createContact(contacts[i].firstName, contacts[i].lastName, contacts[i].phone);
      }
      console.log("Updated table.")
      return false;
    },
    update: function() {

    }
  }
};

function createContact(first, last, number) {
  let name =  document.getElementById('name').value.split(' ');
  first = (typeof first === "undefined") ? name[0] : first;
  last = (typeof last === "undefined") ? name.slice(1).join(' ') : last;
  number = (typeof number === "undefined") ? document.getElementById('phone').value : number;
  let info = {
    "firstName": first,
    "lastName": last ? last : '',
    "phone": number ? number : ''
  }

  let tr = el("tr");
  let firstname = el("td");
  let lastname = el("td");
  let phone = el("td");
  let tbody = document.getElementsByTagName('tbody')[0];

  firstname.setAttribute("class", "firstname");
  lastname.setAttribute("class", "lastname");
  phone.setAttribute("class", "phone");

  tr.appendChild(firstname).appendChild(str(first));
  tr.appendChild(lastname).appendChild(str(last));
  tr.appendChild(phone).appendChild(str(number));
  tbody.appendChild(tr);
}

table.data();
