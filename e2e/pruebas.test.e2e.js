import {element, by, device, expect, waitFor} from 'detox';
import {expect as jestExpect, describe, beforeEach, test} from '@jest/globals';

const doLogin = async (user, password) => {
  await element(by.id('username-textinput')).typeText(user);
  await element(by.id('password-textinput')).typeText(password);
  await element(by.id('login-button')).tap();
};

const doNavigateToDrawer = async screen => {
  await element(by.id('header-drawer-button')).tap();
  await element(by.text(screen)).tap();
};

const countItems = async (itemIdPrefix, listTestId) => {
  let count = 0;
  while (true) {
    try {
      await waitFor(element(by.id(`${itemIdPrefix}${count}`))).toBeVisible();
      if (count > 8) {
        await element(by.id(listTestId)).scroll(78, 'down');
      }
      count++;
    } catch (error) {
      break;
    }
  }
  return count;
};

describe('Pruebas E2E', () => {
  beforeEach(async () => {
    await device.launchApp({newInstance: true, permissions: {camera: 'YES'}});
  });

  test('Should login successfully', async () => {
    await doLogin('vendedor1', 'password1');
    await expect(element(by.text('Productos'))).toExist();
  });

  test('Should reject login from a non seller user', async () => {
    await doLogin('user1', 'password1');
    await expect(element(by.text('Error Login'))).toExist();
  });

  test('Should reject login from a non valid credentials', async () => {
    await doLogin('user12', 'password1');
    await expect(
      element(by.text('Credenciales inválidas, intente de nuevo.')),
    ).toExist();
  });

  test('Should create an order sucessfully', async () => {
    await doLogin('vendedor1', 'password1');
    await doNavigateToDrawer('Órdenes');
    await waitFor(element(by.id('order-item-0')))
      .toBeVisible()
      .withTimeout(10000);
    const initialCount = await countItems('order-item-', 'orders-flatlist');
    console.log(initialCount);
    await doNavigateToDrawer('Visitas');
    await element(by.id('floating-action-button')).tap();
    await element(by.id('abarrotes-platanito-item')).atIndex(0).tap();
    await element(by.id('descripción-input')).typeText('test');
    await element(by.id('camera-button')).tap();
    await element(by.id('capture-button')).tap();
    await element(by.text('Crear')).tap();
    await element(by.id('visit-item-0')).tap();
    await element(by.text('Crear Orden')).tap();
    await element(by.id('plus-circle')).tap();
    await element(by.id('plus-item-0')).tap();
    await element(by.id('close-modal')).tap();
    await element(by.text('Crear Orden')).tap();
    await element(by.id('orders-flatlist')).scrollTo('top');
    const finalCount = await countItems('order-item-', 'orders-flatlist');
    console.log(finalCount);
    await jestExpect(finalCount).toEqual(initialCount + 1);
  }, 1200000);
});
