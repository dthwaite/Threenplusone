/**
 * @file Counts steps to 1 for large numbers using the 'Three N plus 1' method
 * @author Dominic Thwaites
 *
 */
(function() {
    var power=50;
    var base=Math.pow(2,power);

    /**
     * @param n {number} The initial number to set
     * @constructor
     */
    function ThreeNplus1(n) {
        this.value=[];
        if (typeof n=="number" && !isNaN(n) && n>=0) {
            n = Math.floor(n);
            for (var i = 0; n > 0; i++) {
                this.value.push(n);
                if (this.value[i] >= base) {
                    n = Math.floor(this.value[i] / base);
                    this.value[i] %= base;
                } else n = 0;
            }
        }
        this._iterate();
    }

    ThreeNplus1.testmode=false;

    /**
     * Creates a random number
     *
     * Warning: A number with more than 10,000 digits may take many seconds to calculate
     * Extra warning: A number with more than 100,000 digits may take a long time!
     *
     * @param digits Number of approximate decimal digits as a guide for the size of number to set
     * @throws Error if digits not a positive number
     */
    ThreeNplus1.prototype.random=function(digits) {
        this.value = [];
        if (typeof digits=="number" && digits>0) {
            var digitsPerElement = Math.log(base) / Math.log(10);
            while (digits > digitsPerElement) {
                this.value.push(Math.floor((ThreeNplus1.testmode ? 0.33 : Math.random()) * base));
                digits -= digitsPerElement;
            }
            this.value.push(1+Math.floor((ThreeNplus1.testmode ? 0.77 : Math.random()) * Math.pow(10, digits)));
            this._iterate();
        }
        return this;
    };

    /**
     * Adds a ThreeNplus1 number to the existing number
     *
     * @param n The number to add
     */
    ThreeNplus1.prototype.add=function(n) {
        if (n instanceof ThreeNplus1) {
            var carry=0;
            for (var i=0;i<n.value.length || carry>0;i++) {
                if (i<n.value.length ) carry+=n.value[i];
                if (this.value.length==i) this.value.push(carry);
                else this.value[i] += carry;
                if (this.value[i] >= base) {
                    carry = Math.floor(this.value[i] / base);
                    this.value[i] %= base;
                } else carry = 0;
            }
            this._iterate();
        }
        return this;
    };

    /**
     * @returns {string} Indicates the number and the count of UPS and DOWNS to reach 1
     */
    ThreeNplus1.prototype.toString=function() {
        var digits=1+Math.floor(((this.value.length-1)*Math.log(base)+Math.log(this.value[this.value.length-1]))/Math.log(10));
        var value="big";
        if (this.value.length==1) value=this.value[0];
        return "Digits: "+digits+"("+value+") Ups: "+this.ups+" Downs: "+this.downs;
    };

    /**
     * Performs the 3N+1/2 rule repeatedly until the number reaches 1 to deliver a count of UP and DOWN steps
     */
    ThreeNplus1.prototype._iterate=function() {
        // Reset the count of ups and downs before we start
        this.ups=0;
        this.downs=0;

        // Do nothing if we've no number
        if (this.value.length==0) return;

        //Working variables that mutate - n copy of the number, carry - where the LSB is
        var n=this.value.slice();
        var carry=1;

        // Multiplies each element by 3 and carry the overflow into the next element
        // Note that the base is set such that a multiplication will not cause a real
        // overflow in a JS number
        function multiplybythree(carry) {
            for (var i = 0; i < n.length; i++) {
                n[i] *= 3;
                n[i] += carry;
                if (n[i] >= base) {
                    carry = Math.floor(n[i] / base);
                    n[i] %= base;
                } else carry = 0;
            }
            if (carry) n.push(carry);
        }

        // Loop until the number becomes 1 - i.e. the LSB is the only bit set
        while(true) {
            // Remove empty "1's" digits and increment downs by the power of two that a digit represents
            while (n[0] == 0) {
                n.shift();
                this.downs += power;
                carry = 1;
            }
            // Find where the LSB is - i.e. where the number becomes odd
            while (n[0] % (carry * 2) == 0) carry *= 2;
            // If the LSB is the only bit set the we've reach 1 and we're done
            if (n[0] == carry && n.length == 1) break;
            // Multiply by three and add 1 to complete one "up" step
            multiplybythree(carry);
            this.ups++;
        }
        // Adjust downs by the power of 2 where the LSB is
        // and take away the ups as every up involves one division by 2
        this.downs+=(Math.round((Math.log(carry) / Math.log(2)))-this.ups);
    };

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = ThreeNplus1;
    } else if (typeof define === 'function' && define.amd) {
        define(['ThreeNplus1'], ThreeNplus1);
    } else if (typeof window !== 'undefined') {
        window.ThreeNplus1 = ThreeNplus1;
    }
})();

