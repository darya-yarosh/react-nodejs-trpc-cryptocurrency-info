export function checkFonts() {
    checkIsLoaded()
}

// https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/ready
// The promise will only resolve once the document has completed loading fonts,
// layout operations are completed, and no further font loads are needed.
function checkIsLoaded() {
    cy.document()
            .then(document => document.fonts.ready)
            .then(value => {
                cy.log('Font loading completed')
                checkIsValidFonts()
                cy.wait(200)
            }) 
}

function checkIsValidFonts() {
    const FONT_STYLES = '"Segoe UI", sans-serif';

    cy.get('*[class^="app__wrapper"]')
        .should(
            'have.css', 
            'font-family', 
            FONT_STYLES
        )
}