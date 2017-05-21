import { DlmPage } from './app.po';

describe('dlm App', () => {
  let page: DlmPage;

  beforeEach(() => {
    page = new DlmPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
