/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {

        var len = allFeeds.length;
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(len).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('all feeds have a url defined that is not empty', function() {
            try {
                for (var i = 0; i < len; i++) {
                    expect(allFeeds[i].hasOwnProperty("url")).toBeTruthy();
                    expect(allFeeds[i].url).toBeTruthy();
                }
            } catch (err) {
                console.error('An error occured while running test: ' + err);
                fail('An error occured while running test: ' + err);
            }
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('all feeds have a name defined that is not empty', function() {
            try {
                for (var i = 0; i < len; i++) {
                    expect(allFeeds[i].hasOwnProperty("name")).toBeTruthy();
                    expect(allFeeds[i].name).toBeTruthy();
                }
            } catch (err) {
                console.error('An error occured while running test: ' + err);
                fail('An error occured while running test: ' + err);
            }
        });
    });


    /* A new test suite named "The menu" */
    describe('The menu', function() {

        // declaring and assigning a variable with the menu's css transform matrix value when hidden
        var hiddenPositionMatrix = 'matrix(1, 0, 0, 1, -192, 0)';

        // a function to test if the body element contains the class "menu-hidden".
        var isMenuHiddenClassAdded = function() {
            return document.body.classList.contains('menu-hidden');
        };

        // getting the menu's css transform matrix
        var menuPositionMatrix = function() {
            return $('.slide-menu').css('-webkit-transform') || $('.slide-menu').css('transform');
        };

        /* A test that ensures the menu element is
         * hidden by default.
         */
        it('is hidden by default', function() {
            try {
                expect(menuPositionMatrix()).toBe(hiddenPositionMatrix);
                expect(isMenuHiddenClassAdded()).toBeTruthy();
            } catch (err) {
                console.error('An error occured while running test: ' + err);
                fail('An error occured while running test: ' + err);
            }

        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it("hamburger icon toggles menu open and closed on click", function() {

            try {

                var el = $('.menu-icon-link');

                // loop twice to ensure the class is being added and removed
                for (i = 0; i < 2; i++) {

                    // Checking if the class 'menu-hidden' is being added and removed from the body element.
                    // checking if the class is present
                    if (isMenuHiddenClassAdded()) {

                        //if it is present trigger click and expect it to be removed
                        el.trigger('click');
                        expect(isMenuHiddenClassAdded()).toBeFalsy();

                    } else {

                        //if it is not present trigger click and expect it to be added
                        el.trigger('click');
                        expect(isMenuHiddenClassAdded()).toBeTruthy();
                    }

                }

            } catch (err) {
                console.error('An error occured while running test: ' + err);
                fail('An error occured while running test: ' + err);
            }

        });
    });

    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Because, loadFeed() is asynchronous this test uses Jasmine's beforeEach 
         * and asynchronous done() function.
         */



        beforeEach(function(done) {
            try {
                loadFeed(0, function() {
                    done();
                });
            } catch (err) {
                console.error('An error occured while trying to load feeds: ' + err);
                done.fail('An error occured while trying to load feeds: ' + err);
            }
        });





        it("feeds are loaded and added to the DOM", function(done) {
            try {
                // checking that at least one element with the class "entry-link" have been added to the DOM
                expect($('.entry-link').length > 0).toBeTruthy();
                done();
            } catch (err) {
                console.error('An error occured while running test: ' + err);
                done.fail('An error occured while running test: ' + err);
            }
        });



    });

    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        // declaring new array variable to store initial content
        var testContent = [];
        var contentArray;
        var arrLen;

        beforeAll(function(done) {

            try {
                // getting reference to the current feed lists title elements
                contentArray = $('.entry-link').find('h2');
                arrLen = contentArray.length;


                // looping the contentArray and pushing the content of the title elements to the testContent array
                for (i = 0; i < arrLen; i++) {
                    testContent.push(contentArray[i].textContent);
                }

                //calling loadFeed, loading a different feed then previously loaded.
                loadFeed(1, function() {
                    done();
                });
            } catch (err) {
                console.error('An error occured while trying to load feeds: ' + err);
                done.fail('An error occured while trying to load feeds: ' + err);
            }

        });

        it("new feeds loaded have replaced previously loaded feeds", function(done) {

            try {

                // getting reference to the new feed lists title elements
                var newContentArray = $('.entry-link').find('h2');

                var newLen = newContentArray.length;

                var len = arrLen >= newLen ? newLen : arrLen;

                // looping the contentArray and compare the value of contentArray to ensure it is not equal to the value of newContentArray's text content at each index.
                for (i = 0; i < len; i++) {
                    expect(testContent[i]).not.toEqual(newContentArray[i].textContent);
                }

                done();

            } catch (err) {
                console.error('An error occured while running the compare content test: ' + err);
                done.fail('An error occured while running the compare content test: ' + err);
            }


        });
    });
}());