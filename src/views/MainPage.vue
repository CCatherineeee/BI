<template>
  <div>
    <el-tabs v-model="activeName" style="margin: 20px">
      <el-tab-pane label="单步查询" name="first">
        <el-row>
          <el-col :span="24" >
            <div style="border-color: #2c3e50;border-width: thin;border-radius: 10px;box-shadow: 2px 2px 5px #000;padding: 10px;margin: 10px">
              <el-form ref="form" :model="form" style="margin: 10px;">
                <el-row>
                  <el-select v-model="form.label" placeholder="请选择">
                    <el-option
                        v-for="item in optionsLabel"
                        :key="item.label"
                        :label="item.value"
                        :value="item.label">
                    </el-option>
                  </el-select>
                  关键词：
                  <el-input v-model="form.name" style="width: 15%"></el-input>
                  步长：
                  <el-input v-model="form.step" style="width: 15%"></el-input>
                  上限：
                  <el-input v-model="form.limit" style="width: 15%"></el-input>
                  <el-button type="primary" @click="getDataFromANode">搜索</el-button>
                </el-row>

              </el-form>
            </div>
          </el-col>
          <el-col :span="14">
            <div v-if="tableData.label == 'author'" style="border-color: #2c3e50;border-width: thin;border-radius: 10px;box-shadow: 2px 2px 5px #000;padding: 10px;margin: 10px">
              <el-descriptions title="作者信息">
                <el-descriptions-item label="ID">{{tableData.author_id}}</el-descriptions-item>
                <el-descriptions-item label="姓名">{{tableData.name}}</el-descriptions-item>
                <el-descriptions-item label="论文数量">{{tableData.publish_count}}</el-descriptions-item>
                <el-descriptions-item label="被引用量">{{tableData.total_citations}}</el-descriptions-item>
                <el-descriptions-item label="p_index">{{tableData.p_index}}</el-descriptions-item>
                <el-descriptions-item label="up_index">{{tableData.up_index}}</el-descriptions-item>
                <el-descriptions-item label="h_index">{{tableData.h_index}}</el-descriptions-item>
              </el-descriptions>
            </div>

            <div v-if="tableData.label == 'interest'" style="border-color: #2c3e50;border-width: thin;border-radius: 10px;box-shadow: 2px 2px 5px #000;padding: 10px;margin: 10px">
              <el-descriptions title="兴趣信息">
                <el-descriptions-item label="方向">{{tableData.interest_name}}</el-descriptions-item>
              </el-descriptions>
            </div>

            <div v-if="tableData.label == 'affiliation'" style="border-color: #2c3e50;border-width: thin;border-radius: 10px;box-shadow: 2px 2px 5px #000;padding: 10px;margin: 10px">
              <el-descriptions title="机构信息">
                <el-descriptions-item label="名称">{{tableData.affiliation_name}}</el-descriptions-item>
              </el-descriptions>
            </div>

            <div v-if="tableData.label == 'paper'" style="border-color: #2c3e50;border-width: thin;border-radius: 10px;box-shadow: 2px 2px 5px #000;padding: 10px;margin: 10px">
              <el-descriptions title="论文信息">
                <el-descriptions-item label="标题">{{tableData.title}}</el-descriptions-item>

                <el-descriptions-item label="摘要">{{tableData.abstract}}</el-descriptions-item>

                <el-descriptions-item label="年份">{{tableData.year}}</el-descriptions-item>

              </el-descriptions>
            </div>
          </el-col>

        </el-row>
      </el-tab-pane>
      <el-tab-pane label="多步查询" name="second">
        <el-row>
          <el-col :span="24" >
            <div style="border-color: #2c3e50;border-width: thin;border-radius: 10px;box-shadow: 2px 2px 5px #000;padding: 10px;margin: 10px">
              <el-form ref="form" :model="form2" style="margin: 10px;">
                <el-row>
                  <el-select v-model="form2.label" placeholder="请选择">
                    <el-option
                        v-for="item in optionsLabel"
                        :key="item.label"
                        :label="item.value"
                        :value="item.label">
                    </el-option>
                  </el-select>
                  起点关键词：
                  <el-input v-model="form2.sourceName" style="width: 10%"></el-input>
                  终点关键词：
                  <el-input v-model="form2.targetName" style="width: 10%"></el-input>
                  步长：
                  <el-input v-model="form2.step" style="width: 10%"></el-input>
                  上限：
                  <el-input v-model="form2.limit" style="width: 10%"></el-input>
                  <el-button type="primary" @click="getDataFromTwoNode">搜索</el-button>
                </el-row>

              </el-form>
            </div>
          </el-col>
          <el-col :span="14">
            <div v-if="tableData.label == 'author'" style="border-color: #2c3e50;border-width: thin;border-radius: 10px;box-shadow: 2px 2px 5px #000;padding: 10px;margin: 10px">
              <el-descriptions title="作者信息">
                <el-descriptions-item label="ID">{{tableData.author_id}}</el-descriptions-item>
                <el-descriptions-item label="姓名">{{tableData.name}}</el-descriptions-item>
                <el-descriptions-item label="论文数量">{{tableData.publish_count}}</el-descriptions-item>
                <el-descriptions-item label="被引用量">{{tableData.total_citations}}</el-descriptions-item>
                <el-descriptions-item label="p_index">{{tableData.p_index}}</el-descriptions-item>
                <el-descriptions-item label="up_index">{{tableData.up_index}}</el-descriptions-item>
                <el-descriptions-item label="h_index">{{tableData.h_index}}</el-descriptions-item>
              </el-descriptions>
            </div>

            <div v-if="tableData.label == 'interest'" style="border-color: #2c3e50;border-width: thin;border-radius: 10px;box-shadow: 2px 2px 5px #000;padding: 10px;margin: 10px">
              <el-descriptions title="兴趣信息">
                <el-descriptions-item label="方向">{{tableData.interest_name}}</el-descriptions-item>
              </el-descriptions>
            </div>

            <div v-if="tableData.label == 'affiliation'" style="border-color: #2c3e50;border-width: thin;border-radius: 10px;box-shadow: 2px 2px 5px #000;padding: 10px;margin: 10px">
              <el-descriptions title="机构信息">
                <el-descriptions-item label="名称">{{tableData.affiliation_name}}</el-descriptions-item>
              </el-descriptions>
            </div>

            <div v-if="tableData.label == 'paper'" style="border-color: #2c3e50;border-width: thin;border-radius: 10px;box-shadow: 2px 2px 5px #000;padding: 10px;margin: 10px">
              <el-descriptions title="论文信息">
                <el-descriptions-item label="标题">{{tableData.title}}</el-descriptions-item>

                <el-descriptions-item label="摘要">{{tableData.abstract}}</el-descriptions-item>

                <el-descriptions-item label="年份">{{tableData.year}}</el-descriptions-item>

              </el-descriptions>
            </div>
          </el-col>

        </el-row>

      </el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
      <d3-network ref="net" :net-nodes="nodes" :net-links="links"
                  :options="options"
                  :selection="selection"
                  :class="svgClass"
                  :link-cb="lcb"
                  :node-cb="ncb"
                  @node-click="clickNode"
                  @link-click="clickLink"/>

  </div>
</template>

<script>
import D3Network from "../componet/vue-d3-network/src/vue-d3-network.vue";
import axios from "axios";



export default {
  name: "MainPage",
  components:{
    // eslint-disable-next-line vue/no-unused-components
    D3Network
  },
  data(){
    return{
      form2:[],
      optionsLabel:[
        {
          label:'author',
          value:'作者'
        },
        {
          label:'interest',
          value:'兴趣'
        },
        {
          label:'paper',
          value:'论文'

        },
        {
          label:'affiliation',
          value:'机构'

        },
        {
          label:'publication',
          value:'期刊'

        }
      ],
      tableData:[],
      linkWidth: 2,
      linkDistance: 50,
      bodyStrength: -150,
      svgTheme: false, // light

      nodes:[],
      links:[],

      offset_X: 0,
      offset_Y: 0,
      nodeSize: 14,
      fontSize: 14,
      force: 9000,
      svgClass: {
        noselect: true,
        crosshair: false
      },
      selection: {
        links: {},
        nodes: {}
      },
      form:{
        step:"",
        id:"",
        limit:"",
      },
      allNodeType: [
        "author",
        "interest",
        "affiliation",
        "paper",
        "publication",
      ],
      allLinkType:[
        "belong_to",
        "cooperate",
        "is_interested_in",
        "publish",
        "write",
      ],
      linkStyleList: [
        "linkManage",
        "linkDeployed",
        "linkProvides",
        "linkContains",
        "linkSupervises",
        "linkHas",
        "linkProfile"
      ],
    }
  },
  computed:{
    options() {
      return {
        force: this.force,
        offset: {
          x: this.offset_X,
          y: this.offset_Y
        },
        size:{
          w:1000,
          h:1000
        },
        nodeSize: this.nodeSize,
        fontSize: this.fontSize,
        nodeLabels: true,
        linkLabels: true,
        canvas: false,
        linkWidth:2,
        profileLinks: [],

      };
    }
  },
  methods:{
    handleResuly(nodes,links){
      this.nodes = [];
      this.links = [];
      this.nodes = nodes;
      this.links = links
    },
    async getDataFromANode(){
      await axios.get("/api/BI/getID",{
        params:{
          name:this.form.name,
          label:this.form.label
        }
      }).then(res=>{
        console.log(res.data.id)
        this.form.id = res.data.id
      })
      await axios.get("http://101.43.113.43:8080/BI/searchANode",{
        params:{
          id:this.form.id,
          step:this.form.step,
          limit:this.form.limit
        }}).then(res=>{
        this.handleResuly(res.data.nodes,res.data.relations)
        console.log(res)

      })
    },
    lcb(link) {
      link._color = "black";
      // link._svgAttrs = {
      //   "stroke-width": this.linkWidth,
      //   opacity: 1,
      //   "marker-end": "url(#m-end)"
      // };
      this.allLinkType.forEach((element, index) => {
        if (link.properties.label == element) {
          link._linkLabelClass = this.linkStyleList[index];
          // console.log(link)
        }
      });
      return link;
    },
    ncb(node) {
      // this.allNodeType.forEach((element, index, array) => {
      //   if (node.properties.label == element) {
      //     console.log(element);
      //     console.log("element");
      //     node._cssClass = this.styleList[index];
      //     // node._linkLabelClass = this.linkStyleList[index];
      //     // console.log(node)
      //   }
      //   //  node._cssClass = this.styleList[1];
      // });

      // node._cssClass = "nodesInit";
      return node;
    },

    async clickNode(e,node){
      console.log(node)
      this.tableData = node.properties
      await axios.get("http://101.43.113.43:8080/BI/searchANode",{
        params:{
          id:node.id,
          step:this.form.step,
          limit:this.form.limit
        }}).then(res=>{
          console.log(res)
        // 查找方式有点问题 用find
        for(var i=0; i<res.data.nodes.length; i++){
          var check = this.nodes.find(function(item){
            return res.data.nodes[i].properties.id == item.id
          })
          console.log(check)
          if(check == undefined){
            this.nodes.push(res.data.nodes[i])
          }
        }

        for(var k=0; k<res.data.relations.length; k++){
          check = this.links.find(function(item){
            return res.data.relations[k].properties.id == item.id
          })
          if(check == undefined){
            this.links.push(res.data.relations[k])
          }
        }
      })
    },
    async getDataFromTwoNode(){
      await axios.get("/api/BI/getID",{
        params:{
          name:this.form2.sourceName,
          label:this.form2.label
        }
      }).then(res=>{
        console.log(res.data.id)
        this.form2.sourceId = res.data.id
      })
      await axios.get("/api/BI/getID",{
        params:{
          name:this.form2.targetName,
          label:this.form2.label
        }
      }).then(res=>{
        console.log(res.data.id)
        this.form2.targetId = res.data.id
      })
      await axios.get("/api/BI/searchByTwoNodes",{
        params:{
          sourceId:this.form2.sourceId,
          targetId:this.form2.targetId,
          step:this.form2.step,
          limit:this.form2.limit
        }}).then(res=>{
        this.handleResuly(res.data.nodes,res.data.relations)
        console.log(res)

      })
    }
  },
  created() {

  }
}
</script>

<style scoped>

</style>
