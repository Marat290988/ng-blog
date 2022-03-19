import {NestedTreeControl} from '@angular/cdk/tree';
import { Component, Input, OnChanges } from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeNode} from "../../blocks/models/nested-tree-node";

/**
 * @title Tree with nested nodes
 */
@Component({
  selector: 'app-nested-tree-ui',
  templateUrl: './nested-tree-ui.component.html',
  styleUrls: ['./nested-tree-ui.component.scss']
})
export class NestedTreeUiComponent implements OnChanges {
  treeControl = new NestedTreeControl<NestedTreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<NestedTreeNode>();
  @Input() nodes: NestedTreeNode[];

  ngOnChanges(changes): void {
    if (changes.nodes) {
      this.dataSource.data = this.nodes;
    }
  }

  hasChild = (_: number, node: NestedTreeNode) => !!node.children && node.children.length > 0;
}
