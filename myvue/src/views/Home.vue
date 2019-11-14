<template>
  <div class="home">
      <el-button type="text" @click="dialogFormVisible = true">创建banner</el-button>

<el-dialog title="收货地址" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="排序" :label-width="formLabelWidth">
      <el-input v-model="form.sort" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="备注" :label-width="formLabelWidth">
      <el-input v-model="form.remark" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="链接" :label-width="formLabelWidth">
      <el-input v-model="form.type" autocomplete="off"></el-input>
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="add" >确 定</el-button>
  </div>
</el-dialog>




     <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="序号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="remark"
      label="备注"
      width="120">
    </el-table-column>
    <el-table-column
      prop="type"
      label="类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="sort"
      label="排序"
      width="120">
    </el-table-column>
    <el-table-column
      prop="create_time"
      label="创建时间"
      width="300">
    </el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      width="100">
       <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
        <el-button type="text" size="small" @click="deletes(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

     <div class="block">
    <span class="demonstration">调整每页显示条数</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      
      :page-sizes="[1, 2, 3, 4]"
      :page-size="100"
      layout="sizes, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
    data() {
      return {
        tableData: [],
        limit:1,
        pagenum:1,
        total:0,
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          remark: '',
          type: '',
          sort: ''
        },
        formLabelWidth: '120px',
        
      }
    },
    methods: {
       handleSizeChange(val) {
         this.limit=val
        console.log(`每页 ${val} 条`);
        this.getData()
      },
      handleCurrentChange(val) {
        this.pagenum=val
        console.log(`当前页: ${val}`);
        this.getData()
      },
    handleClick(row) {
      console.log(row);
    },
    getData(){
        axios.get("/fen",{params:{limit:this.limit,pagenum:this.pagenum}}).then((res)=>{
          console.log(res.data)
              this.tableData=res.data.data
              //  console.log(total.total)
              this.total=res.data.total
              })
    },
    deletes(row){
       let id=row.id
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get("/del",{params:{id}}).then(({data})=>{
                  this.getData()
                }) 
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
       
     
    },
    add() {
        
        console.log({...this.form})
        axios.get("/add",{params:{...this.form}}).then((res)=>{
          console.log(res)
          this.getData()
          this.dialogFormVisible = false
        })
      }

  },
    created(){
      this.getData()
    }
  }
</script>
