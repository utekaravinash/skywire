import {PATHS} from "../../../src/app/app-routing.module";
import BasePage from "./base-page.po";
import {findById, waitForVisibility} from "../util/selection";
import {by, element} from "protractor";
import {LoginPage} from "./login";
import {APP_SOCKSC, APP_SSHC, APP_SSHS} from "../util/constants";

export class NodesListPage extends BasePage {

  path = PATHS.nodes;
  private NODES_TABLE_ID = "nodeListTable";
  private ROW_INDEX = "nodeIndex";
  private ROW_LABEL = "nodeLabel";
  private ROW_KEY = "nodeKey";
  private ROW_STATUS_ONLINE = "nodeStatusOnline";

  private getNodesTable() {
    return findById(this.NODES_TABLE_ID);
  }

  navigateTo() {
    let result = new LoginPage().navigateTo();
    new LoginPage().login();
    return result;
  }

  waitNodesTablesToBeLoaded() {
    waitForVisibility(this.getNodesTable());
  }

  private getTableRows() {
    return this.getNodesTable().all(by.tagName('tr'));
  }

  getTableRowsCount() {
    this.waitNodesTablesToBeLoaded();
    return this.getTableRows().count();
  }

  getFirstNodeIndex() {
    this.waitNodesTablesToBeLoaded();
    return this.getFirstNodeField(this.ROW_INDEX).getText();
  }

  getFirstNodeField(field: string) {
    return this.getFirstRow().element(by.id(field));
  }

  private getFirstRow() {
    return this.getTableRows().get(1);
  }

  getFirstNodeLabel() {
    this.waitNodesTablesToBeLoaded();
    return this.getFirstNodeField(this.ROW_LABEL).getText();
  }

  getFirstNodeKey() {
    this.waitNodesTablesToBeLoaded();
    return this.getFirstNodeField(this.ROW_KEY).getText();
  }

  getFirstNodeTooltip() {
    this.waitNodesTablesToBeLoaded();
    waitForVisibility(this.getFirstNodeField(this.ROW_STATUS_ONLINE));
    return this.getFirstNodeField(this.ROW_STATUS_ONLINE).getAttribute("title");
  }

  clickFirstNode() {
    this.waitNodesTablesToBeLoaded();
    this.getFirstRow().click();
  }

  isVisible() {
    this.waitNodesTablesToBeLoaded();
    return this.getNodesTable().isDisplayed();
  }

  isAppRunning(appName: string) {
    const el = element(by.cssContainingText('.node-app-attr', appName));
    waitForVisibility(el);
    return el.isDisplayed();
  }

  isSshsAppRunning() {
    return this.isAppRunning(APP_SSHS)
  }

  isSockscAppRunning() {
    return this.isAppRunning(APP_SOCKSC)
  }

  isSshcAppRunning() {
    return this.isAppRunning(APP_SSHC)
  }
}
