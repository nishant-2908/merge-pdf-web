var no_of_items = document.getElementById("number_of_pdf");
var generated_fields = document.getElementById("generated_field");
var warning = document.getElementById("warning");
var submit_button = document.getElementById("button");
var form = document.getElementById("form");
var output_pdf = document.getElementById("output_pdf");

function generate_field() {
    var items = parseInt(no_of_items.value);
    generated_fields.innerHTML = '';
    for (var i = 0; i < items; i++) {

        generated_fields.innerHTML += `
        <div class="mb-3 row">
                    <div class="col">
                        <label for="item_url_label">
                            <h3 class="choose-title">
                                PDF ${i + 1} Location
                            </h3>
                        </label>
                        <input type="text" name="pdf_url${i}" class="url form-control" placeholder="Enter the PDF's Location" required
                        autocapitalize="off" autocomplete="off" minlength="10" inputmode="url">
                    </div>
                </div>`
    }

}

function checkValidity() {

    // If the submit button is designed for Check
    if (submit_button.innerText == "Check") {

        // Fetch the PDF's urls
        var urls = document.getElementsByClassName("url");

        // For each item in the list
        for (var i = 0; i < urls.length; i++) {

            // For each item in the same list but starting from the next element of the above for loop iterator
            for (var j = i + 1; j < urls.length; j++) {

                if (urls[i].value.toString() == "") {
                    // Change the innerText for the warning
                    warning.innerText = "PDF " + (i + 1) + "'s Location found empty";

                    // Change the color to red
                    warning.style.color = "red";

                    // Return the function
                    return;
                }
                // If the two values are equal
                else if (urls[i].value == urls[j].value) {

                    // Change the innerText for the warning
                    warning.innerText = "PDF " + (i + 1) + "'s Location found matching with PDF " + (j + 1);

                    // Change the color to red
                    warning.style.color = "red";

                    // Return the function
                    return;
                }

                // If the output pdf url is equal to any of the pdf url
                else if (urls[i].value == output_pdf.value) {

                    // Change the innerText for the warning element
                    warning.innerText = "PDF " + (i + 1) + "'s URL found matching with Output PDF Location";

                    // Change the warning color to red
                    warning.style.color = "red";

                    // Return the function
                    return;
                }
            }
        }

        // If the function has still not returned

        // Enable the submit button
        submit_button.disabled = false;

        // Change the innerText for the warning
        warning.innerText = "No duplicates found \nPlease wait on this page while we process the PDF";

        // Change the color to green
        warning.style.color = "green";

        // Change the innerText of the submit button to Submit
        submit_button.innerText = "Submit";
    }
    // Submit the form if the submit button's innerText is not Check 
    else {
        form.submit();
    }
}

// Run the function
generate_field();

// Add the event listener to the number of items field to generate additional fields
no_of_items.addEventListener("input", generate_field);

// Add the event listener to the submit button to check the form for duplicates
submit_button.addEventListener("click", checkValidity);