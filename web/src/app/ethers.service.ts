import {Injectable} from '@angular/core';
import {ethers} from 'ethers';

declare let ethereum: any;
declare let window: any;

@Injectable({
    providedIn: 'root'
})
export class EthersService {

    public provider;

    constructor() {

        this.initWeb3();
    }

    async initWeb3() {

        if (window.ethereum) {

            window.web3 = new ethers.providers.Web3Provider(ethereum);
            this.provider = window.web3;

            try {

                // Request account access if needed
                await ethereum.enable();
            } catch (error) {

                // User denied account access...
                alert('Please connect Metamask to dApp!');
            }
        } else if (typeof window.web3 !== 'undefined') {

            this.provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        } else {

            const infura = new ethers.providers.InfuraProvider('homestead');

            this.provider = new ethers.providers.FallbackProvider([
                infura,
            ]);
        }
    }
}
