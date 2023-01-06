import {Component} from '@angular/core';
import words from "random-words";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    columns: string[] = [
        'level',
        'description',
        'keywords',
        'randomNumber',
        'randomBoolean',
    ]
    treeData: any[];
    selectedNode: any;

    constructor() {
        this.treeData = this.generateRandomTreeData(50);
        this.addParentAndLevelProperties(this.treeData);
    }

    generateRandomTreeData(numElements: number): any[] {
        const treeData: any[] = [];

        for (let i = 0; i < numElements; i++) {
            treeData.push({
                name: 'Node ' + (i + 1),
                children: this.generateRandomChildren(i + 1, 0),
            });
        }

        return treeData;
    }

    generateRandomChildren(nodeNumber: number, level: number): any[] {
        const numChildren = Math.floor(Math.random() * 3);

        const children: any[] = [];

        for (let i = 0; i < numChildren; i++) {
            children.push({
                name: 'Child ' + nodeNumber + '-' + (i + 1),
                children: level < 4 ? this.generateRandomChildren(i + 1, level + 1) : [],
            });
        }

        return children;
    }

    addParentAndLevelProperties(treeData: any[], parent: any = null, level: number = 0) {
        treeData.forEach(node => {
            node.parent = parent;
            node.level = level;
            node.description = node.name + ' (Level ' + level + ')';
            node.keywords = words({ exactly: 3, join: ', ' });
            node.randomNumber = Math.floor(Math.random() * 100);
            node.randomBoolean = Math.random() < 0.5;

            node.expanded = true;

            if (node.children) {
                this.addParentAndLevelProperties(node.children, node, level + 1);
            }
        });
    }

    rowSelected(node: any) {
        if (!(node.children && node.children.length > 0)) {
            console.log('Selected node: ', node);
            this.selectedNode = node;
        }
    }
}
