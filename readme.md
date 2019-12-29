# Top 1000 Books Summary Comparison
> actual dataset is contains 518 books.

**Install & Use**

```bash
npm i -g book-summary-comparator
book-summary-comparator
```

<details>

*How*

> Firstly find which document is which books.

*Steps*

* Step 1: Gather which ref we have.

```bash
ls |grep "" > ref.txt # For unix
ls | grep "" > ref.txt # For linux
```

* Step 2: Gather which book list we have.

```javascript
// open https://www.edebiyatogretmeni.org/etiket/1000-roman-ozeti-indir/
// Execute this JS in browser console:
// Gather content.
const data = document.querySelectorAll('.entry-content p')[1].innerHTML.split('<br>').map(row => row.toLowerCase()).join('\n')
// Generate hidden input for copy to clipboard.
const dummyInput = document.createElement('input')
dummyInput.value = data;

/* Select the text field */
dummyInput.select();
dummyInput.setSelectionRange(0, 99999);

/* Copy the text inside the text field */
document.execCommand("copy"); // Ta-da! Copied your clipboard.
```

Paste into a ref.txt
```bash
echo `pbpaste` > list.txt
```

You have both `list.txt` and `ref.txt`

* Step 2: Match the refs and list.

```bash
node match.js; # Match the books and refs. Left pad 00001 to 1.doc
node extract.js # Extract data accordingly 1.doc to 1.txt
```

* Step 3: Generate db.json

> Just loop over database then fs.writeFileSync..

* Step 4: Compare books with other books. Big O (n^2)

> Thankfully Node.js and JS, any loop is parallel executed by default. Does not needed any parallelisation process.

```bash
node magic.js # Comparison algorithm is: Dice's Coefficient.
# Generates two indexed JSON. case_1, case_2
```

Other staffs are for build CLI :)

</details>

Cheers,
Cagatay Cali.
