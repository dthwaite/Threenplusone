var assert = require('assert');
var ThreeNplus1=require('../');
ThreeNplus1.testmode=true;

describe('ThreeNplus1.js',function() {
    it('Check low numbers set by standard constructor',function() {
        var a=new ThreeNplus1(3);
        assert.equal(a.ups,2,'2 ups');
        assert.equal(a.downs,3,'3 downs');
        assert.equal(a.toString(),'Digits: 1(3) Ups: 2 Downs: 3');
        var b=new ThreeNplus1(31);
        assert.equal(b.ups,39,'39 ups');
        assert.equal(b.downs,28,'28 downs');
        assert.equal(b.toString(),'Digits: 2(31) Ups: 39 Downs: 28');
        var c=new ThreeNplus1(100);
        assert.equal(c.ups,7,'7 ups');
        assert.equal(c.downs,11,'11 downs');
        assert.equal(c.toString(),'Digits: 3(100) Ups: 7 Downs: 11');
        var d=new ThreeNplus1(103);
        assert.equal(d.toString(),'Digits: 3(103) Ups: 31 Downs: 25');
        var e=new ThreeNplus1(123456789);
        assert.equal(e.ups,58,'58 ups');
        assert.equal(e.downs,61,'61 downs');
        assert.equal(e.toString(),'Digits: 9(123456789) Ups: 58 Downs: 61');
    });

    it('Check high numbers set by random assignment',function() {
        var a=new ThreeNplus1().random(5);
        assert.equal(a.ups,13,'13 ups');
        assert.equal(a.downs,24,'24 downs');
        assert.equal(a.toString(),'Digits: 5(77001) Ups: 13 Downs: 24');
        var b=new ThreeNplus1().random(50);
        assert.equal(b.ups,489,'489 ups');
        assert.equal(b.downs,452,'452 downs');
        assert.equal(b.toString(),'Digits: 50(big) Ups: 489 Downs: 452');
        var c=new ThreeNplus1().random(500);
        assert.equal(c.ups,3975,'3975 ups');
        assert.equal(c.downs,3986,'3986 downs');
        assert.equal(c.toString(),'Digits: 500(big) Ups: 3975 Downs: 3986');
        var c=new ThreeNplus1().random(5000);
        assert.equal(c.ups,39583,'39583 ups');
        assert.equal(c.downs,39764,'39764 downs');
        assert.equal(c.toString(),'Digits: 5000(big) Ups: 39583 Downs: 39764');
    });

    it('Check consecutive and additions numbers',function() {
        var a=new ThreeNplus1().random(1000);
        for (var i=0;i<12;i++) {
            a.add(new ThreeNplus1(1));
            assert.equal(a.toString(),'Digits: 1000(big) Ups: 8818 Downs: 8480');
        }
        a.add(new ThreeNplus1(1));
        assert.equal(a.toString(),'Digits: 1000(big) Ups: 7960 Downs: 7978');
        a.add(new ThreeNplus1(100));
        assert.equal(a.toString(),'Digits: 1000(big) Ups: 8818 Downs: 8480');
        a.add(new ThreeNplus1(10000));
        assert.equal(a.toString(),'Digits: 1000(big) Ups: 8818 Downs: 8480');
        a.add(new ThreeNplus1(10000));
        assert.equal(a.toString(),'Digits: 1000(big) Ups: 8818 Downs: 8480');
        a.add(new ThreeNplus1(123456789012345));
        assert.equal(a.toString(),'Digits: 1000(big) Ups: 7960 Downs: 7978');
    });

    it('Check large set of consecutive numbers',function() {
        var a=new ThreeNplus1().random(100);
        var one=new ThreeNplus1(1);
        var results={};
        for (var i=0;i<1000;i++) {
            a.add(one);
            if (!(a.toString() in results)) results[a.toString()]=1;
            else results[a.toString()]++;
        }
        assert.equal(results['Digits: 100(big) Ups: 735 Downs: 762'],934);
        assert.equal(results['Digits: 100(big) Ups: 805 Downs: 803'],5);
        assert.equal(results['Digits: 100(big) Ups: 870 Downs: 841'],29);
        assert.equal(results['Digits: 100(big) Ups: 964 Downs: 896'],32);
    });
});