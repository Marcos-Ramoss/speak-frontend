import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { HeaderComponent } from './app/layout/header/header.component';
import { RecorderDialogComponent } from './app/shared/components/recorder-dialog/recorder-dialog.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        ButtonModule,
        ToastModule,
        TooltipModule,
        HeaderComponent,
        RecorderDialogComponent
    ],
    providers: [MessageService],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'VozSocial';
    isRecording = false;

    openRecordingDialog(): void {
        this.isRecording = true;
    }

    onRecordingDialogChange(visible: boolean): void {
        this.isRecording = visible;
    }

    onPostCreated(post: any): void {
        // Post já é adicionado automaticamente pelo service
        this.isRecording = false;
    }
}