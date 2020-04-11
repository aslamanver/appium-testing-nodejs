// javascript
const webdriverio = require('webdriverio')
const assert = require('chai').assert
const expect = require('chai').expect
const wd = require('wd')

const options = {
    port: 4723,
    capabilities: {
        platformName: "Android",
        platformVersion: "5",
        appPackage: "com.aslam.app",
        appActivity: "com.aslam.app.Launcher",
        appWaitActivity: "com.aslam.app.Login",
        deviceName: "Android Automation"
    }
}

const driver = wd.promiseChainRemote(options)

describe('Create Android session', function () {

    before(() => {
        this.timeout(300 * 1000)
        return driver.init(options.capabilities)
    })

    after(() => {
        console.log("quitting")
    })

    it('should create and destroy a session', async () => {
        const element = await driver.elementById(resourceId("edtEmail"))
        expect(element).to.exist
    })

    it('should type in editText', async () => {

        const edtEmail = await driver.elementById(resourceId("edtEmail"))
        const btnSignIn = await driver.elementById(resourceId("btnSignIn"))

        await edtEmail.sendKeys('aslam@gmail.com')

        const email = await edtEmail.text()

        await btnSignIn.click();

        assert.equal(email, 'aslam@gmail.com')
    })

});

var resourceId = (elemId) => options.capabilities.appPackage + ":id/" + elemId;

