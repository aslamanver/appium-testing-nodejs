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
        appPackage: "com.cba.payable",
        appActivity: "com.cba.payable.Launcher",
        appWaitActivity: "com.cba.payable.Login",
        deviceName: "Android PAX"
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
        const element = await driver.elementById(resourceId("edtBankType"))
        expect(element).to.exist
    })

    it('should type in bank', async () => {

        const edtBankType = await driver.elementById(resourceId("edtBankType"))
        const edtEmail = await driver.elementById(resourceId("edtEmail"))
        const edtPassword = await driver.elementById(resourceId("edtPassword"))
        const btnSignIn = await driver.elementById(resourceId("btnSignIn"))

        await edtBankType.sendKeys('seylan', () => {
            console.log('Done')
        })

        await edtEmail.sendKeys('aslampax')
        await edtPassword.sendKeys('abc123450')

        const bank = await edtBankType.text()
        const username = await edtBankType.text()
        const password = await edtBankType.text()

        await btnSignIn.click();

        // assert.equal(value, 'seylan')
    })

});

var resourceId = (elemId) => options.capabilities.appPackage + ":id/" + elemId;

