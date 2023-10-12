import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  nextNumber: number;
  lastNumber: number = -1;
  sleep;
  doneItems: number[] = [];
  btnDisabled: boolean = false;
  dispItems: number[] = [];
  elem;

  constructor(@Inject(DOCUMENT) private document: any) {

  }

  ngOnInit(): void {
    this.sleep = (ms) => new Promise(r => setTimeout(r, ms));
    this.elem = document.documentElement;
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

  getRandomNum() {
    this.nextNumber = Math.round(Math.random() * 90);
  }

  async getSpin() {
    this.openFullscreen();
    if (this.doneItems.length >= 90) {
      // alert("Board is Over !!");
      let ans = confirm("Board is Over !! Do u want to Restart !!")
      if (ans == true) {
        window.location.reload();
      }
      // alert(ans)
      this.btnDisabled = false;
      this.nextNumber = undefined
      return;
    }
    this.btnDisabled = true;
    for (let index = 0; index < ((100 - this.doneItems.length) / 2); index++) {
      this.getRandomNum();
      await this.sleep(20);
    }
    // console.log(`c${this.nextNumber}`);
    // console.log(this.doneItems);
    if (this.nextNumber != 0 && this.doneItems.indexOf(this.nextNumber) == -1) {

      if (this.lastNumber != -1) {
        document.getElementById(`c${this.lastNumber}`).setAttribute("style", "background-color:green;color:white;");
      }
      document.getElementById(`c${this.nextNumber}`).setAttribute("style", "background-color:red;color:white;");
      document.getElementById(`t${this.nextNumber}`).innerText = String(this.nextNumber);
      this.doneItems.push(this.nextNumber);
      this.lastNumber = this.nextNumber;
      this.dispItems = this.doneItems.slice(-5);
      this.btnDisabled = false;
    }
    else {
      this.getSpin();
    }
  }

}
