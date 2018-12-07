# Deck Web Service Example
[![Build Status](https://travis-ci.org/gnehcc/deck-webservice-example.svg?branch=master)](https://travis-ci.org/gnehcc/deck-webservice-example)

A web service example that returns shuffled decks of playing cards.

### How to Start
- clone the repository
- `$ npm install` all the dependencies
- `$ npm start`
- use [curl](https://curl.haxx.se/) or tools like [postman](https://www.getpostman.com/) for testing.

### Run Unit Test
Go to the command line, change directory to the repo root, and run `$ npm test`.

### Supported routes
- POST /api/deck/new
- POST /api/deck/:id/shuffle
- POST /api/deck/:id/deal
- GET /api/deck/:id
- POST /api/deck/:id/cut/:position


### License
[MIT](https://opensource.org/licenses/MIT)

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
