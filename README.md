# A web service example that returns shuffled decks of playing cards.
[![Build Status](https://travis-ci.org/gnehcc/deck-webservice-example.svg?branch=master)](https://travis-ci.org/gnehcc/deck-webservice-example)

### How to Start
- clone the repository
- `$ npm install` all the dependencies
- `$ npm start`
- use [curl](https://curl.haxx.se/) or tools like [postman](https://www.getpostman.com/) for running tests locally.

Note: Project has integrated with [Travis CI](https://travis-ci.org/gnehcc/deck-webservice-example)

### Run Unit Test
Go to your command line, change directory to the repo, and run `$ npm test` in command line.

### Supported routes
- POST /api/deck/new
- PUT /api/deck/:id/shuffle
- PUT /api/deck/:id/deal
- GET /api/deck/:id
- PUT /api/deck/:id/cut/:position


### License
[MIT](https://opensource.org/licenses/MIT)

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.