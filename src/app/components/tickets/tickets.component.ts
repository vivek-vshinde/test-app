import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  tinput = {
    sheettype: '',
    noofsheets: 0,
    printsrno: true,
    serialnofrom: 0,
    serialnoto: 0,
    title: '',
    logo: '',
    savetemp: false
  };
  form: NgForm;
  submitted = false;

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.tinput = {
      sheettype: '',
      noofsheets: 0,
      printsrno: true,
      serialnofrom: 0,
      serialnoto: 0,
      title: '',
      logo: '',
      savetemp: false
    };
  }

  getTickets() {
    // this.router.navigate(['tprint']);
    const navigationExtras: NavigationExtras = {
      state: { data: this.tinput },
    };
    // this.router.navigate([], navigationExtras).then(result => { window.open('tprint', '_blank'); });
    const link = this.router.serializeUrl(this.router.createUrlTree(['tprint'], { queryParams: this.tinput }));
    // console.log(link);
    window.open(link, '_blank');
  }

  validateForm(form: NgForm): boolean {
    this.tinput = form.value;
    if (this.tinput.sheettype == '') return false;
    if (this.tinput.noofsheets <= 0) return false;
    return true;
  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    if (this.validateForm(form)) {
      // console.log(form.value);    
      this.tinput = form.value;
      this.getTickets();
    }
  }
}
