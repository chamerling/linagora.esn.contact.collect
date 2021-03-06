'use strict';

const expect = require('chai').expect;

describe('The vcard module', function() {
  let module;

  beforeEach(function() {
    module = require('../../../backend/lib/vcard');
  });

  describe('The emailToVcard function', function() {
    let firstName, lastName, fullName, email, emailWithFullName;

    beforeEach(function() {
      firstName = 'Christophe';
      lastName = 'Hamerling';
      fullName = `${firstName} ${lastName}`;
      email = 'chamerling@open-paas.org';
      emailWithFullName = `${fullName} <${email}>`;
    });

    it('should create a vcard with email property, uid and email as fn when email does not contain name', function() {
      const { vcard } = module.emailToVcard(email);

      expect(vcard.getFirstPropertyValue('uid')).to.exist;
      expect(vcard.getFirstPropertyValue('email')).to.equal(email);
      expect(vcard.getFirstPropertyValue('fn')).to.equal(email);
    });

    it('should create a vcard with email, uid and fn when email contains a name', function() {
      const { vcard } = module.emailToVcard(emailWithFullName);

      expect(vcard.getFirstPropertyValue('uid')).to.exist;
      expect(vcard.getFirstPropertyValue('email')).to.equal(email);
      expect(vcard.getFirstPropertyValue('fn')).to.equal(fullName);
    });

    it('should create a vcard with firstName and lastName', function() {
      const { vcard } = module.emailToVcard(emailWithFullName);

      expect(vcard.getFirstPropertyValue('n')).to.deep.equal([lastName, firstName]);
    });

    it('should return undefined when email is undefined', function() {
      const { vcard } = module.emailToVcard();

      expect(vcard).to.be.undefined;
    });

    it('should return undefined when email is empty', function() {
      const { vcard } = module.emailToVcard('');

      expect(vcard).to.be.undefined;
    });

    it('should return undefined when email is not an email', function() {
      const { vcard } = module.emailToVcard('notanemail');

      expect(vcard).to.be.undefined;
    });
  });
});
