import { expect } from 'chai';

import currentWindows, {
  SET_CURRENT_WINDOWS,
  getCurrentWindows,
  setCurrentWindows
} from '../../../app/modules/currentWindows';

describe('currentWindows reducer', () => {

  it('handles initial state', () => {
    expect(
      currentWindows(undefined, {})
    ).to.eql([]);
  });

  it('handles setCurrentWindows', () => {
    expect(
      currentWindows([ { id: 0, tabs: [] }], {
        type: SET_CURRENT_WINDOWS,
        windows: [
          { id: 1, tabs: [] }
        ]
      })
    ).to.eql([
      { id: 1, tabs: [] }
    ]);
  });

});

describe('currentWindows actions', () => {

  it('setCurrentWindows creates action', () => {
    expect(
      setCurrentWindows([
        { id: 2, tabs: [] }
      ])
    ).to.eql({
      type: SET_CURRENT_WINDOWS,
      windows: [
        { id: 2, tabs: [] }
      ]
    });
  });

});
