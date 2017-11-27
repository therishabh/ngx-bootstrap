import { browser, by, element, ElementFinder, ExpectedConditions as EC } from 'protractor';
import { AccordionPo } from '../../pages/accordion.po';
import { LandingPo } from '../../pages/landing.po';
import { GettingStartedPo } from '../../pages/gettingStarted.po';
import { AlertPo } from '../../pages/alert.po';
import { ButtonsPo } from '../../pages/buttons.po';
import { CarouselPo } from '../../pages/carousel.po';
import { CollapsePo } from '../../pages/collapse.po';
import { DatepickerPo } from '../../pages/datepicker.po';
import { DropdownsPo } from '../../pages/dropdowns.po';
import { ModalsPo } from '../../pages/modals.po';
import { PaginationPo } from '../../pages/pagination.po';
import { PopoverPo } from '../../pages/popover.po';
import { ProgressbarPo } from '../../pages/progressbar.po';
import { RatingPo } from '../../pages/rating.po';
import { SortablePo } from '../../pages/sortable.po';
import { TabsPo } from '../../pages/tabs.po';
import { TimepickerPo } from '../../pages/timepicker.po';
import { TooltipPo } from '../../pages/tooltip.po';
import { TypeaheadPo } from '../../pages/typeahead.po';
import { BasePo } from '../pages/basePage.po';

const TIMEOUT = 6000;
let message: string;

export async function clickOnElemWithText(selectorToCompare: string, template: string) {
  const searchedElement = await element(by.cssContainingText(selectorToCompare, template));

  await clickWithScroll(searchedElement);
}

export async function clickWithScroll(button: ElementFinder) {
  const viewPortBorders = await browser.driver.manage().window().getSize();
  const elemPosition = await button.getLocation();
  if (elemPosition.y > viewPortBorders.height) {
    await browser.executeScript(function () {
      return arguments[0].scrollIntoView();
    }, button);
  }
  await safeClick(button);
}

export function getPageByCompName(componentName: string): BasePo {
  let page;

  switch (componentName) {
    case 'Getting Started': {
      page = new GettingStartedPo();
      break;
    }
    case 'Accordion': {
      page = new AccordionPo();
      break;
    }
    case 'Alerts': {
      page = new AlertPo();
      break;
    }
    case 'Buttons': {
      page = new ButtonsPo();
      break;
    }
    case 'Carousel': {
      page = new CarouselPo();
      break;
    }
    case 'Collapse': {
      page = new CollapsePo();
      break;
    }
    case 'Datepicker': {
      page = new DatepickerPo();
      break;
    }
    case 'Dropdowns': {
      page = new DropdownsPo();
      break;
    }
    case 'Modals': {
      page = new ModalsPo();
      break;
    }
    case 'Pagination': {
      page = new PaginationPo();
      break;
    }
    case 'Popover': {
      page = new PopoverPo();
      break;
    }
    case 'Progressbar': {
      page = new ProgressbarPo();
      break;
    }
    case 'Rating': {
      page = new RatingPo();
      break;
    }
    case 'Sortable': {
      page = new SortablePo();
      break;
    }
    case 'Tabs': {
      page = new TabsPo();
      break;
    }
    case 'Timepicker': {
      page = new TimepickerPo();
      break;
    }
    case 'Tooltip': {
      page = new TooltipPo();
      break;
    }
    case 'Typeahead': {
      page = new TypeaheadPo();
      break;
    }
    default: {
      page = new LandingPo();
    }
  }

  return page;
}

export async function safeClick(button: ElementFinder) {
  await waitForClickable(button);

  await button.click();
}

export async function waitFor(condition: Function, optMessage?: string) {
  await browser.wait(condition, TIMEOUT, optMessage);
}

export async function waitForClickable(button: ElementFinder) {
  message = 'Waiting for clickable ';

  await waitFor(EC.elementToBeClickable(button), message + (button.locator() as string));
}

export async function waitForVisible(elem: ElementFinder) {
  message = 'Waiting for appearing element ';

  await waitFor(EC.visibilityOf(elem), message + (elem.locator() as string));
}
