import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BankGroup, BANKGROUPS } from './data';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data';

@Component({
  selector: 'ngx-timezone',
  templateUrl: './ngx-timezone.component.html',
  styleUrls: ['./ngx-timezone.component.scss'],
})
export class NgxTimezoneComponent implements OnInit, OnDestroy {
  @Input() placeholder = 'Timezone';
  /** list of banks */

  /** list of bank groups */
  protected bankGroups: BankGroup[] = BANKGROUPS;

  /** control for the selected bank for option groups */
  public bankGroupsCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword for option groups */
  public bankGroupsFilterCtrl: FormControl = new FormControl();

  /** list of bank groups filtered by search keyword for option groups */
  public filteredBankGroups: ReplaySubject<BankGroup[]> = new ReplaySubject<
    BankGroup[]
  >(1);

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor() {
    const m = moment();
    debugger;
  }

  ngOnInit() {
    // load the initial bank list
    this.filteredBankGroups.next(this.copyBankGroups(this.bankGroups));

    // listen for search field value changes
    this.bankGroupsFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBankGroups();
      });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected filterBankGroups() {
    if (!this.bankGroups) {
      return;
    }
    // get the search keyword
    let search = this.bankGroupsFilterCtrl.value;
    const bankGroupsCopy = this.copyBankGroups(this.bankGroups);
    if (!search) {
      this.filteredBankGroups.next(bankGroupsCopy);
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBankGroups.next(
      bankGroupsCopy.filter((bankGroup) => {
        const showBankGroup = bankGroup.name.toLowerCase().indexOf(search) > -1;
        if (!showBankGroup) {
          bankGroup.banks = bankGroup.banks.filter(
            (bank) => bank.name.toLowerCase().indexOf(search) > -1
          );
        }
        return bankGroup.banks.length > 0;
      })
    );
  }

  protected copyBankGroups(bankGroups: BankGroup[]) {
    const bankGroupsCopy = [];
    bankGroups.forEach((bankGroup) => {
      bankGroupsCopy.push({
        name: bankGroup.name,
        banks: bankGroup.banks.slice(),
      });
    });
    return bankGroupsCopy;
  }
}
