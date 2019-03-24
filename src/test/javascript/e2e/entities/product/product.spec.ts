/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProductComponentsPage, ProductDeleteDialog, ProductUpdatePage } from './product.page-object';

const expect = chai.expect;

describe('Product e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let productUpdatePage: ProductUpdatePage;
    let productComponentsPage: ProductComponentsPage;
    /*let productDeleteDialog: ProductDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        // await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Products', async () => {
        await navBarPage.goToEntity('product');
        productComponentsPage = new ProductComponentsPage();
        await browser.wait(ec.visibilityOf(productComponentsPage.title), 5000);
        expect(await productComponentsPage.getTitle()).to.eq('Products');
    });

    it('should load create Product page', async () => {
        await productComponentsPage.clickOnCreateButton();
        productUpdatePage = new ProductUpdatePage();
        expect(await productUpdatePage.getPageTitle()).to.eq('Create or edit a Product');
        await productUpdatePage.cancel();
    });

    /* it('should create and save Products', async () => {
        const nbButtonsBeforeCreate = await productComponentsPage.countDeleteButtons();

        await productComponentsPage.clickOnCreateButton();
        await promise.all([
            productUpdatePage.setSourceInput('source'),
            productUpdatePage.setDescriptionInput('description'),
            productUpdatePage.languageSelectLastOption(),
            productUpdatePage.subcategorySelectLastOption(),
            productUpdatePage.authorSelectLastOption(),
            // productUpdatePage.suitableDietsSelectLastOption(),
            // productUpdatePage.unsuitableDietsSelectLastOption(),
        ]);
        expect(await productUpdatePage.getSourceInput()).to.eq('source');
        expect(await productUpdatePage.getDescriptionInput()).to.eq('description');
        const selectedIsFinal = productUpdatePage.getIsFinalInput();
        if (await selectedIsFinal.isSelected()) {
            await productUpdatePage.getIsFinalInput().click();
            expect(await productUpdatePage.getIsFinalInput().isSelected()).to.be.false;
        } else {
            await productUpdatePage.getIsFinalInput().click();
            expect(await productUpdatePage.getIsFinalInput().isSelected()).to.be.true;
        }
        const selectedIsVerified = productUpdatePage.getIsVerifiedInput();
        if (await selectedIsVerified.isSelected()) {
            await productUpdatePage.getIsVerifiedInput().click();
            expect(await productUpdatePage.getIsVerifiedInput().isSelected()).to.be.false;
        } else {
            await productUpdatePage.getIsVerifiedInput().click();
            expect(await productUpdatePage.getIsVerifiedInput().isSelected()).to.be.true;
        }
        await productUpdatePage.save();
        expect(await productUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await productComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last Product', async () => {
        const nbButtonsBeforeDelete = await productComponentsPage.countDeleteButtons();
        await productComponentsPage.clickOnLastDeleteButton();

        productDeleteDialog = new ProductDeleteDialog();
        expect(await productDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Product?');
        await productDeleteDialog.clickOnConfirmButton();

        expect(await productComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
