import fitz

def extract_text_from_pdf(file):
    pdf_bytes = file.read()

    doc = fitz.open(
        stream=pdf_bytes,
        filetype="pdf"
    )

    text = ""

    print("Pages:", len(doc))

    for page in doc:
        page_text = page.get_text()

        print("Page text length:", len(page_text))

        text += page_text

    print("Total text length:", len(text))

    return text