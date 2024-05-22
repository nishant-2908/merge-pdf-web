# Importing the required libraries and objects
from flask import Flask, render_template, request, redirect
from flask_session import Session
from os import path
from helpers import apology
from pypdf import PdfMerger

# Setting up the flask application
app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


# Ensures that the cache is removeed
@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


# Main route
@app.route("/")
def main_route():

    # Render the template
    return render_template("home.html")


# Supporting both the methods of GET and POST
@app.route("/merge_pdf", methods=["POST"])
def merge_pdf_home():
    if request.method == "POST":

        # Get the number of PDFs
        no_of_pdf = int(request.form.get("number_of_pdf"))

        # Get the PDF URLs
        pdf_url = [
            request.form.get("pdf_url" + str(i)).replace("\\", "/")
            for i in range(no_of_pdf)
        ]

        # Defining a function to store the output PDF name
        global output_pdf_name

        # Get the output PDF location
        output_pdf = request.form.get("output_pdf")
        output_pdf_name = output_pdf

        # For each PDF URL
        for i, j in enumerate(pdf_url):

            # If the path to the file does not exists
            if not path.exists(j):

                # Return an apology
                return apology("PDF {} not found".format(i + 1))

            elif not path.splitext(j)[1] == ".pdf":

                # Return an apology
                return apology("PDF {} not found".format(i + 1))

        # Run the function with the above parameters
        merge_pdf(pdf_url, output_pdf)

        # Return the redirect message
        return redirect("/merge_pdf/success")


# Defining a function to merge the pdf
def merge_pdf(url_list: list, output_file_name: str):

    # Defining a PdfMerger object
    merger = PdfMerger()

    # For each file in the list
    for file in url_list:

        # Append the file to the merger
        merger.append(file)

    # Write the merged PDF to the output file
    merger.write(output_file_name)

    # Close the merger object
    merger.close()


# Supporting only GET method for the success page
@app.route("/merge_pdf/success")
def merge_pdf_success():
    return render_template(
        "success.html",
        output_pdf=globals()["output_pdf_name"],
    )


# Running the app in debug mode
if __name__ == "__main__":
    app.run(debug=True)
